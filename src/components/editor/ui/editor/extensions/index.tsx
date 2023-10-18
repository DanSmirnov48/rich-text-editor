import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";
import FontFamily from '@tiptap/extension-font-family';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from "@tiptap/extension-placeholder";
import TiptapUnderline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Highlight from "@tiptap/extension-highlight";
import SlashCommand from "./slash-command";

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

import {createLowlight} from 'lowlight'
const lowlight = createLowlight()

import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import scss from "highlight.js/lib/languages/scss.js";
import stylus from "highlight.js/lib/languages/stylus.js";
import json from "highlight.js/lib/languages/json.js";
import xml from "highlight.js/lib/languages/xml.js";
import md from "highlight.js/lib/languages/markdown.js";

// CSS
lowlight.register("css", css);
lowlight.register("scss", scss);
lowlight.register("stylus", stylus);

// JS
lowlight.register("js", js);
lowlight.register("javascript", js);
lowlight.register("jsx", js);
lowlight.register("ts", ts);
lowlight.register("tsx", ts);
lowlight.register("typescript", ts);
lowlight.register("json", json);

// HTML
lowlight.register("html", html);
lowlight.register("xml", xml);
lowlight.register("md", md);
lowlight.register("markdown", md);

export const defaultExtensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: "list-disc list-outside leading-3 -mt-2",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class:
          "list-decimal list-outside leading-3 -mt-2",
      },
    },
    listItem: {
      HTMLAttributes: {
        class: "leading-normal -mb-2",
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: "border-l-4 border-stone-700",
      },
    },
    // codeBlock: {
    //   HTMLAttributes: {
    //     class:
    //       "rounded-xl bg-gray-700 p-5 font-sans font-medium text-indigo-200 text-xl",
    //   },
    // },
    code: {
      HTMLAttributes: {
        class:
          "rounded-md bg-stone-300 px-1.5 py-1 font-mono font-medium text-stone-900",
        spellcheck: "false",
      },
    },
    dropcursor: {
      color: "#DBEAFE",
      width: 4,
    },
    gapcursor: false,
  }),
  TiptapLink.configure({
    HTMLAttributes: {
      class:
        "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer",
    },
  }),
  FontFamily.configure({
    types: ['textStyle'],
  }),  
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return `Heading ${node.attrs.level}`;
      }
      return "Press '/' for commands";
    },
    includeChildren: true,
  }),
  //Chage № 1: Adding lowlight for Virtual syntax highlighting
  Document,
  Paragraph,
  Text,
  CodeBlockLowlight.configure({
    lowlight,
    languageClassPrefix: 'language-js',
    HTMLAttributes: {
      class: 'rounded-xl font-medium text-xl',
    },
  }),
  //-----------------------------------------------------------
  SlashCommand,
  TiptapUnderline,
  TextStyle,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
    alignments: ['left', 'center', 'right', 'justify'],
    defaultAlignment: 'left', 
  }),
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: "not-prose pl-2",
    },
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: "flex items-start my-4",
    },
    nested: true,
  })
];