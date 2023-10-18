import { Editor } from "@tiptap/core";

export const getPrevText = (
  editor: Editor, { chars, offset = 0, }: { chars: number; offset?: number; }
) => {
  return editor.state.doc.textBetween(
    Math.max(0, editor.state.selection.from - chars),
    editor.state.selection.from - offset,
    "\n"
  );
};
