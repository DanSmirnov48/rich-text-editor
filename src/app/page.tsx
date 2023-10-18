import { Editor } from "@/components/editor";

export default function page() {
  return (
    <div className="flex min-h-screen grainy flex-col items-center sm:px-5 sm:pt-[calc(5vh)]">
      <Editor />
    </div>
  );

  // return (
  //   <div className="border-stone-200 shadow-xl border rounded-lg px-16 py-8 w-full">
  //     <div className="flex min-h-screen flex-col items-center sm:px-5 sm:pt-[calc(5vh)]">
  //       <Editor />
  //     </div>
  //   </div>
  // );
}
