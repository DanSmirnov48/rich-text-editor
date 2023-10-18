"use client";
import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { defaultEditorProps } from "./props";
import { defaultExtensions } from "./extensions";
import useLocalStorage from "@/components/editor/lib/hooks/use-local-storage";
import { useDebouncedCallback } from "use-debounce";
import { useCompletion } from "ai/react";
import { toast } from "sonner";
import { defaultEditorContent } from "./default-content";
import { EditorBubbleMenu } from "./bubble-menu";
import { Context } from "./provider";
import { default as TopMenu } from "./top-menu-bar";
import CharacterCount from "@tiptap/extension-character-count";

export default function Editor({}) {
  const [content, setContent] = useLocalStorage(
    "editor_content",
    defaultEditorContent
  );
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [hydrated, setHydrated] = useState(false);
  const completionApi = "/api/generate";
  const wordLimit = 3000;

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const json = editor.getJSON();
    setSaveStatus("Saving...");
    setContent(json);
    
    setTimeout(() => {
      setSaveStatus("Saved");
    }, 500);
  }, 1000);

  const editor = useEditor({
    extensions: [
      ...defaultExtensions,
      CharacterCount.configure({
        limit: wordLimit,
      }),
    ],
    editorProps: { ...defaultEditorProps },
    onUpdate: (e) => {
      setSaveStatus("Unsaved");
      debouncedUpdates(e);
    //   const selection = e.editor.state.selection;
    //   const lastTwo = getPrevText(e.editor, {
    //     chars: 2,
    //   });
    //   if (lastTwo === "++" && !isLoading) {
    //     e.editor.commands.deleteRange({
    //       from: selection.from - 2,
    //       to: selection.from,
    //     });
    //     complete(getPrevText(e.editor, { chars: 5000 }));
    //   } else {
    //     debouncedUpdates(e);
    //   }
    },
    autofocus: "end",
  });

  const { complete, completion, isLoading, stop } = useCompletion({
    id: "editor",
    api: completionApi,
    onFinish: (_prompt, completion) => {
      editor?.commands.setTextSelection({
        from: editor.state.selection.from - completion.length,
        to: editor.state.selection.from,
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const prev = useRef("");

  // Insert chunks of the generated text
  useEffect(() => {
    const diff = completion.slice(prev.current.length);
    prev.current = completion;
    editor?.commands.insertContent(diff);
  }, [isLoading, editor, completion]);

  useEffect(() => {
    // if user presses escape or cmd + z and it's loading,
    // stop the request, delete the completion, and insert back the "++"
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || (e.metaKey && e.key === "z")) {
        stop();
        if (e.key === "Escape") {
          editor?.commands.deleteRange({
            from: editor.state.selection.from - completion.length,
            to: editor.state.selection.from,
          });
        }
        // editor?.commands.insertContent("++");
      }
    };
    const mousedownHandler = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      stop();
      if (window.confirm("AI writing paused. Continue?")) {
        complete(editor?.getText() || "");
      }
    };
    if (isLoading) {
      document.addEventListener("keydown", onKeyDown);
      window.addEventListener("mousedown", mousedownHandler);
    } else {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", mousedownHandler);
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", mousedownHandler);
    };
  }, [stop, isLoading, editor, complete, completion.length]);

  // Default: Hydrate the editor with the content from localStorage.
  // If disableLocalStorage is true, hydrate the editor with the defaultValue.
  useEffect(() => {
    if (editor && content && !hydrated) {
      editor.commands.setContent(content);
      setHydrated(true);
    }
  }, [editor, content, hydrated]);

  return (
    <Context.Provider value={{ completionApi }}>
      <div
        onClick={() => {
          editor?.chain().focus().run();
        }}
        className="relative min-h-[900px] w-full max-w-screen-lg border-stone-200 bg-white sm:mb-[calc(5vh)] sm:rounded-2xl sm:border sm:shadow-2xl"
      >

        <div className="w-full bg-indigo-800 bg-opacity-60 px-12 sm:rounded-t-2xl">
          <div className="flex h-20 justify-between items-center">
            {editor && <TopMenu editor={editor} />}

            <div className="z-10 rounded-md max-h-fit px-4 py-3 text-sm transition-colors duration-200 bg-stone-100 sm:bottom-auto sm:top-5">
              {saveStatus}
            </div>
          </div>
        </div>

        {editor && <EditorBubbleMenu editor={editor} />}
        <EditorContent editor={editor} spellCheck="false"/>

        <div className="w-full px-12 sm:rounded-b-2xl">
          <div className="flex h-12 justify-end items-center">
            <div className="absolute bottom-3 right-10">
              <div className="character-count opacity-30 text-sm select-none flex justify-start">
                {editor && editor.storage.characterCount.characters()}/{wordLimit}{" "}
                characters
                {/* {editor && editor.storage.characterCount.words()} words */}
              </div>
            </div>

          </div>
        </div>
      </div>
    </Context.Provider>
  );
}
