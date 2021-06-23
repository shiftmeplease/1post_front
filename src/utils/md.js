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
  //
  //Disabled
  //"list",
  //"table",
  //"reference", // ?
  //"code", //TODO check
  //"hr",
  //"fence", /// ``` js \n\n ```
  //lheading", //TODO check
  //
  //Enabled by default
  //"paragraph",
]);

//inline
md.enable([
  "link", //[link](<to> "stuff")  // <a> ?

  "backticks", // ` ``` // <code>
  "strikethrough", // ~~ ff ~~ // <s>
  "emphasis", //*this* and _that_
  "image", // /![Minion](https://octodex.github.com/images/minion.png)
  "autolink",
  // "html_inline",
  //Disabled
  //"entity",
  // "newline", // ?
  "escape", // is needed?
  //
  // Enabled by default
  // "balance_pairs",
  // "text",
  // "text_collapse",
]);

export const mdrender = (value) => {
  return DOMPurify.sanitize(md.render(value));
};
