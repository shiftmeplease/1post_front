import DOMPurify from "dompurify";
import MarkdownIt from "markdown-it";

const md = MarkdownIt("zero", { linkify: true });

md.enable(["normalize", "block", "inline", "linkify", "replacements"]); //Core //TODO check replacements
md.enable([
  "fence",
  "blockquote",
  "hr",
  "list",
  "heading",
  "lheading", //TODO check
  "paragraph",
]);

md.enable("newline"); //'\n'
md.enable("escape");
md.enable("backticks"); //   ` `
md.enable("strikethrough");
md.enable("emphasis");
md.enable("link");
md.enable("image");
md.enable("autolink");

// [ 'normalize',      require('./rules_core/normalize')      ],
// [ 'block',          require('./rules_core/block')          ],
// [ 'inline',         require('./rules_core/inline')         ],
// [ 'linkify',        require('./rules_core/linkify')        ],
// [ 'replacements',   require('./rules_core/replacements')   ],
// [ 'smartquotes',    require('./rules_core/smartquotes')    ]

// // which can be terminated by this one.
// [ 'table',      require('./rules_block/table'),      [ 'paragraph', 'reference' ] ],
// [ 'code',       require('./rules_block/code') ],
// [ 'fence',      require('./rules_block/fence'),      [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
// [ 'blockquote', require('./rules_block/blockquote'), [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
// [ 'hr',         require('./rules_block/hr'),         [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
// [ 'list',       require('./rules_block/list'),       [ 'paragraph', 'reference', 'blockquote' ] ],
// [ 'reference',  require('./rules_block/reference') ],
// [ 'html_block', require('./rules_block/html_block'), [ 'paragraph', 'reference', 'blockquote' ] ],
// [ 'heading',    require('./rules_block/heading'),    [ 'paragraph', 'reference', 'blockquote' ] ],
// [ 'lheading',   require('./rules_block/lheading') ],
// [ 'paragraph',  require('./rules_block/paragraph') ]

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
