import node from "@sveltejs/adapter-node";
import preprocess from "svelte-preprocess";
import autoprefixer from "autoprefixer";

// const pkg = require("./package.json");

/** @type {import('@sveltejs/kit').Config} */
export default {
  kit: {
    // By default, `npm run build` will create a standard Node app.
    // You can create optimized builds for different platforms by
    // specifying a different adapter
    adapter: node(),
    // ssr: true,

    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",

    vite: {
      ssr: {
        external: ["markdown-it", "animejs"],
        // noExternal: Object.keys(pkg.dependencies || {}),
      },
    },
  },
  preprocess: preprocess({
    scss: true,
    postcss: {
      //TODO do not work
      plugins: [autoprefixer],
    },
  }),
};
