import { Editor } from "@tiptap/core";
import {
  Check,
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  TextQuote,
  ListOrdered,
  TextIcon,
  Code,
  CheckSquare,
  Heading4,
} from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { Dispatch, FC, SetStateAction } from "react";
import { BubbleMenuItem } from ".";

interface NodeSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const NodeSelector: FC<NodeSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const items: BubbleMenuItem[] = [
    {
      name: "Text",
      icon: TextIcon,
      command: () =>
        editor.chain().focus().toggleNode("paragraph", "paragraph").run(),
      // I feel like there has to be a more efficient way to do this – feel free to PR if you know how!
      isActive: () =>
        editor.isActive("paragraph") &&
        !editor.isActive("bulletList") &&
        !editor.isActive("orderedList"),
    },
    {
      name: "Heading 1",
      icon: Heading1,
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      name: "Heading 2",
      icon: Heading2,
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      name: "Heading 3",
      icon: Heading3,
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive("heading", { level: 3 }),
    },
    {
      name: "Heading 4",
      icon: Heading4,
      command: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      isActive: () => editor.isActive("heading", { level: 4 }),
    },
    {
      name: "To-do List",
      icon: CheckSquare,
      command: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive("taskItem"),
    },
    {
      name: "Bullet List",
      icon: ListOrdered,
      command: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      name: "Numbered List",
      icon: ListOrdered,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
    {
      name: "Quote",
      icon: TextQuote,
      command: () =>
        editor
          .chain()
          .focus()
          .toggleNode("paragraph", "paragraph")
          .toggleBlockquote()
          .run(),
      isActive: () => editor.isActive("blockquote"),
    },
    {
      name: "Code",
      icon: Code,
      command: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive("codeBlock"),
    },
  ];

  const activeItem = items.filter((item) => item.isActive()).pop() ?? {
    name: "Multiple",
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
