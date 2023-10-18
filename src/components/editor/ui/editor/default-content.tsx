export const defaultEditorContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { textAlign: "left", level: 1 },
      content: [
        {
          type: "text",
          marks: [{ type: "bold" }],
          text: "Exploring the Power of JavaScript and TypeScript"
        }
      ]
    },
    {
      type: "paragraph",
      attrs: { textAlign: "start" },
      content: [
        {
          type: "text",
          text: "JavaScript is the backbone of modern web development, enabling dynamic and interactive experiences on the internet. TypeScript, on the other hand, brings enhanced features and safety checks to the JavaScript ecosystem. In this blog post, we'll take a closer look at the dynamic duo of JavaScript and TypeScript and explore their potential."
        }
      ]
    },
    {
      type: "heading",
      attrs: { textAlign: "start", level: 2 },
      content: [
        {
          type: "text",
          marks: [{ type: "bold" }],
          text: "JavaScript: The Language of the Web"
        }
      ]
    },
    {
      type: "paragraph",
      attrs: { textAlign: "start" },
      content: [
        {
          type: "text",
          text: "JavaScript is a versatile and widely-used programming language for the web. It runs in the browser, allowing developers to create interactive web applications. Here's a simple JavaScript code snippet that displays an alert when a button is clicked:"
        }
      ]
    },
    {
      type: "codeBlock",
      attrs: { language: null },
      content: [
        {
          type: "text",
          text: "// HTML\n<button id=\"myButton\">Click Me</button>\n\n// JavaScript\ndocument.getElementById('myButton').addEventListener('click', function() {\n  alert('Button clicked!');\n});"
        }
      ]
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        {
          type: "text",
          text: "In this example, we use JavaScript to select the button element by its id and add an event listener to trigger an alert when the button is clicked.",
        }
      ]
    },
    {
      type: "heading",
      attrs: { textAlign: "start", level: 2 },
      content: [
        {
          type: "text",
          marks: [{ type: "bold" }],
          text: "TypeScript: Bringing Type Safety to JavaScript"
        }
      ]
    },
    {
      type: "paragraph",
      attrs: { textAlign: "start" },
      content: [
        {
          type: "text",
          text: "TypeScript is a statically-typed superset of JavaScript that adds a layer of predictability and safety to your code. It helps catch errors during development and enhances code maintainability. Here's a TypeScript example:"
        }
      ]
    },
    {
      type: "codeBlock",
      attrs: { language: null },
      content: [
        {
          type: "text",
          text: "// TypeScript\nfunction greet(name: string): string {\n  return `Hello, ${name}!`;\n}\n\nconst personName: string = 'Alice';\nconsole.log(greet(personName));"
        }
      ]
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        {
          type: "text",
          text: "In this code, TypeScript enforces that the name parameter should be of type string, and the greet function must return a string. Type safety helps prevent runtime errors and provides better code documentation.",
        }
      ]
    },
    {
      type: "heading",
      attrs: { textAlign: "start", level: 2 },
      content: [
        {
          type: "text",
          marks: [{ type: "bold" }],
          text: "Combining JavaScript and TypeScript"
        }
      ]
    },
    {
      type: "paragraph",
      attrs: { textAlign: "start" },
      content: [
        {
          type: "text",
          text: "One of the great aspects of TypeScript is its compatibility with JavaScript. You can incrementally add TypeScript to an existing JavaScript project. TypeScript's type annotations can be used where needed to improve code quality without rewriting everything from scratch."
        }
      ]
    },
    {
      type: "codeBlock",
      attrs: { language: "javascript" },
      content: [
        {
          type: "text",
          text: "// JavaScript\nfunction calculateTotal(price, quantity) {\n  return price * quantity;\n}\n// TypeScript\nfunction calculateTotal(price: number, quantity: number): number {\n  return price * quantity;\n}"
        }
      ]
    },
    {
      type: "paragraph",
      attrs: { textAlign: "start" },
      content: [
        {
          type: "text",
          text: "In the example above, we've enhanced a JavaScript function with TypeScript type annotations for the price and quality parameters, ensuring they are of type number and that the function returns a number.",
        }
      ]
    },
    {
      type: "heading",
      attrs: { textAlign: "start", level: 2 },
      content: [
        {
          type: "text",
          marks: [{ type: "bold" }],
          text: "Conclusion"
        }
      ]
    },
    {
      type: "paragraph",
      attrs: { textAlign: "start" },
      content: [
        {
          type: "text",
          text: "JavaScript and TypeScript are powerful tools in modern web development. JavaScript provides the flexibility to create dynamic web applications, while TypeScript adds a layer of safety and predictability. Whether you're a beginner or an experienced developer, mastering both these languages is a valuable asset for your web development journey."
        }
      ]
    },
    {
      type: "paragraph",
      attrs: { textAlign: "start" },
      content: [
        {
          type: "text",
          text: "In future posts, we'll explore more advanced concepts and real-world use cases for JavaScript and TypeScript. Stay tuned!"
        }
      ]
    }
  ]
};
