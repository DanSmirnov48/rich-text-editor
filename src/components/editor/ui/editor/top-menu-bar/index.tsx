import { Editor } from "@tiptap/react";
import * as Separator from "@radix-ui/react-separator";
import {
  Bold,
  Code,
  CodepenIcon,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Undo,
  AlignLeft,
  AlignJustify,
  AlignCenter,
  AlignRight,
  BoldIcon,
  UnderlineIcon,
} from "lucide-react";
import { NodeSelector } from "./node-selector";
import { useState } from "react";
import { FontSelector } from "./font-select";

export interface TopMenuItem {
  name: string;
  font?: string | null;
  isActive: () => boolean;
  command: () => void;
  icon?: typeof BoldIcon;
}
export default function TipTapMenuBar({ editor }: { editor: Editor }) {
  const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState(false);
  const [isFontSelectorOpen, setIsFontSelectorOpen] = useState(false);

  return (
    <div className="flex flex-wrap gap-2">
      {/* First part of tools */}
      <FontSelector
        editor={editor}
        isOpen={isFontSelectorOpen}
        setIsOpen={() => {
          setIsFontSelectorOpen(!isFontSelectorOpen);
          setIsNodeSelectorOpen(false);
        }}
      />

      <NodeSelector
        editor={editor}
        isOpen={isNodeSelectorOpen}
        setIsOpen={() => {
          setIsNodeSelectorOpen(!isNodeSelectorOpen);
          setIsFontSelectorOpen(false);
        }}
      />

      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <Bold className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <Italic className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'is-active' : ''}
      >
        <UnderlineIcon className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <Strikethrough className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        <Code className="w-6 h-6" />
      </button>

      <div className="h-15">
        <Separator.Root
          className="bg-black data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px mx-[5px]"
          decorative
          orientation="vertical"
        />
      </div>

      {/* Second part of tools */}
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
      >
        <AlignLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
      >
        <AlignCenter className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={editor.isActive({ textAlign: "justify" }) ? "is-active" : ""}
      >
        <AlignJustify className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
      >
        <AlignRight className="w-6 h-6" />
      </button>

      <div className="h-15">
        <Separator.Root
          className="bg-black data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px mx-[5px]"
          decorative
          orientation="vertical"
        />
      </div>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <List className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <ListOrdered className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        <CodepenIcon className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        <Quote className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo className="w-6 h-6" />
      </button>
    </div>
  );
}
