import { Editor } from "@tiptap/core";
import { Check, ChevronDown, Pencil, Undo2 } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { Dispatch, FC, SetStateAction } from "react";
import { BubbleMenuItem } from ".";

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
  const items: BubbleMenuItem[] = [
    {
      name: "Reset",
      icon: Undo2,
      command: () => editor.commands.unsetFontFamily(),
      isActive: () => false,
    },
    {
      name: "Inter",
      icon: Pencil,
      command: () => editor.chain().focus().setFontFamily("Inter").run(),
      isActive: () => editor.isActive("textStyle", { fontFamily: "Inter" }),
    },
    {
      name: "Comic Sans",
      icon: Pencil,
      command: () => editor.chain().focus().setFontFamily("Comic Sans MS, Comic Sans").run(),
      isActive: () => editor.isActive("textStyle", { fontFamily: "Comic Sans MS, Comic Sans",}),
    },
    {
      name: "Serif",
      icon: Pencil,
      command: () => editor.chain().focus().setFontFamily("serif").run(),
      isActive: () => editor.isActive("textStyle", { fontFamily: "serif" }),
    },
    {
      name: "Monospace",
      icon: Pencil,
      command: () => editor.chain().focus().setFontFamily("monospace").run(),
      isActive: () => editor.isActive("textStyle", { fontFamily: "monospace" }),
    },
    {
      name: "Cursive",
      icon: Pencil,
      command: () => editor.chain().focus().setFontFamily("cursive").run(),
      isActive: () => editor.isActive("textStyle", { fontFamily: "cursive" }),
    },
  ];

  const activeItem = items.filter((item) => item.isActive()).pop() ?? {
    name: "Font",
  };

  return (
    <Popover.Root open={isOpen}>
      <div className="relative h-full">
        <Popover.Trigger
          className="flex h-full items-center gap-1 whitespace-nowrap p-2 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{activeItem?.name}</span>
          <ChevronDown className="h-4 w-4" />
        </Popover.Trigger>

        <Popover.Content
          align="start"
          className="z-[99999] my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border border-stone-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.command();
                setIsOpen(false);
              }}
              className="flex items-center justify-between rounded-sm px-2 py-1 text-sm text-stone-600 hover:bg-stone-100"
              type="button"
            >
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  {" "}
                  <item.icon className="h-3 w-3" />
                </div>
                <span>{item.name}</span>
              </div>
              {activeItem.name === item.name && <Check className="h-4 w-4" />}
            </button>
          ))}
        </Popover.Content>
      </div>
    </Popover.Root>
  );
};
