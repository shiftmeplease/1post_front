import DOMPurify from "dompurify";
import MarkdownIt from "markdown-it";

const md = MarkdownIt("zero", { linkify: true });

//CORE
md.enable([
  "normalize",
  "block",
  "inline",
  "linkify",
  "smartquotes",
  //"replacements",
]);

//Block
md.enable([
  "blockquote", // >>>  // <blockquote>
  "heading", // # <h1 -h6>
  //"code", //TODO check
  //"reference", // ?
  //"list",
  //"table",
  //
  //Disabled
  //"hr",
  //"fence", /// ``` js \n\n ```
  //lheading", //TODO check
  //
  //Enabled by default
  //"paragraph",
]);

//inline
md.enable([
  //"link", //[link](<to> "stuff")  // <a> ?
  // "newline", // ?
  // "escape", // is needed?
  //"backticks", // ` ``` // <code>
  "strikethrough", // ~~ ff ~~ // <s>
  //"emphasis", //*this* and _that_
  // "image",
  // "autolink",
  "html_inline",
  //Disabled
  //"entity",
  //
  // Enabled by default
  // "balance_pairs",
  // "text",
  // "text_collapse",
]);

export const mdrender = (value) => {
  return DOMPurify.sanitize(md.render(value));
};

// components: {

//     core: {
//       rules: [
//         'normalize',
//         'block',
//         'inline'
//       ]
//     },

//     block: {
//       rules: [
//         'paragraph'
//       ]
//     },

//     inline: {
//       rules: [
//         'text'
//       ],
//       rules2: [
//         'balance_pairs',
//         'text_collapse'
//       ]
//     }
//   }
// };
