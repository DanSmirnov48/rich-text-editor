import { Editor } from "@tiptap/core";
import { Check, ChevronDown, Pencil, Undo2 } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { Dispatch, FC, SetStateAction } from "react";
import { TopMenuItem } from ".";

interface FontSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const FontSelector: FC<FontSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const items: TopMenuItem[] = [
    {
      name: "Reset Font",
      command: () => editor.commands.unsetFontFamily(),
      isActive: () => false,
    },
    {
      name: "Inter",
      font: "Inter",
      command: () => editor.chain().focus().setFontFamily("Inter").run(),
      isActive: () => editor.isActive("textStyle", { fontFamily: "Inter" }),
    },
    {
      name: "Comic Sans",
      font: "Comic Sans MS, Comic Sans",
      command: () =>
        editor.chain().focus().setFontFamily("Comic Sans MS, Comic Sans").run(),
      isActive: () =>
        editor.isActive("textStyle", {
          fontFamily: "Comic Sans MS, Comic Sans",
        }),
    },
    {
      name: "Serif",
      font: "serif",
      command: () => editor.chain().focus().setFontFamily("serif").run(),
      isActive: () => editor.isActive("textStyle", { fontFamily: "serif" }),
    },
    {
      name: "Monospace",
      font: "monospace",
      command: () => editor.chain().focus().setFontFamily("monospace").run(),
      isActive: () => editor.isActive("textStyle", { fontFamily: "monospace" }),
    },
    {
      name: "Cursive",
      font: "cursive",
      command: () => editor.chain().focus().setFontFamily("cursive").run(),
      isActive: () => editor.isActive("textStyle", { fontFamily: "cursive" }),
    },
    {
      name: "Arial",
      font: "arial",
      command: () => editor.chain().focus().setFontFamily("arial").run(),
      isActive: () => editor.isActive("textStyle", { fontFamily: "arial" }),
    },
    {
      name: "Times New Roman",
      font: "Times New Roman",
      command: () =>
        editor.chain().focus().setFontFamily("Times New Roman").run(),
      isActive: () =>
        editor.isActive("textStyle", { fontFamily: "Times New Roman" }),
    },
    {
      name: "Poppins",
      font: "poppins",
      command: () => editor.chain().focus().setFontFamily("poppins").run(),
      isActive: () => editor.isActive("textStyle", { fontFamily: "poppins" }),
    },
  ];

  const activeItem = items.filter((item) => item.isActive()).pop() ?? {
    name: "Font",
  };

  return (
    <Popover.Root open={isOpen}>
      <div className="relative h-full">
        <Popover.Trigger
          className="flex h-full items-center gap-1 whitespace-nowrap py-2 px-3 text-base text-black bg-[#f1f5f9] active:bg-stone-200 rounded-md font-medium"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{activeItem?.name}</span>
          <ChevronDown className="h-4 w-4" />
        </Popover.Trigger>

        <Popover.Content
          align="center"
          className="z-[99999] my-1 flex max-h-80 w-auto flex-col overflow-hidden overflow-y-auto rounded border border-stone-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.command();
                setIsOpen(false);
              }}
              className={`${
                activeItem.name === item.name && "bg-slate-400"
              } flex items-center justify-between rounded-sm px-2 py-1 text-sm font-medium text-stone-600 hover:bg-slate-200`}
              type="button"
            >
              <div className="flex items-center space-x-2">
                <span className={`font-${item.font} font-medium text-base`}>
                  {item.name}
                </span>
              </div>
            </button>
          ))}
        </Popover.Content>
      </div>
    </Popover.Root>
  );
};
