import { Editor } from "@tiptap/core";
import {
  Check,
  ChevronDown,
  AlignLeft,
  AlignJustify,
  AlignCenter,
  AlignRight,
  Undo2
} from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { Dispatch, FC, SetStateAction } from "react";
import { BubbleMenuItem } from ".";

interface TextAlignSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const TextAlignSelector: FC<TextAlignSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const items: BubbleMenuItem[] = [
    {
      name: "Reset",
      icon: Undo2,
      command: () => editor.commands.unsetTextAlign(),
      isActive: () => false,
    },
    {
      name: "Left",
      icon: AlignLeft,
      command: () => editor.commands.setTextAlign('left'),
      isActive: () => editor.isActive({ textAlign: 'left' })
    },
    {
      name: "Justify",
      icon: AlignJustify,
      command: () => editor.commands.setTextAlign('justify'),
      isActive: () => editor.isActive({ textAlign: 'justify' })
    },
    {
      name: "Center",
      icon: AlignCenter,
      command: () => editor.commands.setTextAlign('center'),
      isActive: () => editor.isActive({ textAlign: 'center' })
    },
    {
      name: "Right",
      icon: AlignRight,
      command: () => editor.commands.setTextAlign('right'),
      isActive: () => editor.isActive({ textAlign: 'right' })
    }
  ];

  const activeItem = items.filter((item) => item.isActive()).pop() ?? {
    name: "Align",
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
              {activeItem.name === item.name && (
                <Check className="h-4 w-4" />
              )}
            </button>
          ))}
        </Popover.Content>
      </div>
    </Popover.Root>
  );
};
