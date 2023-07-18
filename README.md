# Astro + Deno Template

This sample project contains a recommended starting point for your Deno project
using Astro.

## Using this template

This template requires the Deno runtime to be installed on your computer. If you
haven't already, please
[install Deno first](https://deno.land/manual/getting_started/installation).

Next, initialize a new Astro project using this template with your favorite
[npm client](https://docs.npmjs.com/cli/v9/configuring-npm/install), as
described in the [Astro docs](https://docs.astro.build/en/getting-started/).

```
npm create astro@latest -- --template kwhinnery/deno-astro-template
```

This template is preconfigured to use Deno rather than Node.js as the JavaScript
runtime for this
[server-side rendering Astro application](https://docs.astro.build/en/guides/server-side-rendering/).
This provides a few benefits:

- The ability to use built-in `Deno` namespace functions, notably the new
  built-in [Deno KV](https://deno.com/kv) database.
- The ability to run in production on [Deno Deploy](https://deno.com/deploy), a
  high performance, globally distributed platform for serverless JavaScript
  applications.
- [Compatibility with the majority of packages on npm](https://deno.land/manual@v1.17.2/npm_nodejs/compatibility_mode),
  both at the runtime level and via the Astro build process (thanks to Vite and
  esbuild).

To use this template for local development, you will use npm scripts in
`package.json` in the same way as described in the Astro documentation. However,
these scripts are configured execute the same commands using the Deno runtime
instead of Node.js.

- Start the local development server with `npm start` or `npm run dev`
- Build a production-ready SSR site with `npm run build`
- After building, you can preview your SSR site locally with `npm run preview`

The template project lightly modifies the base Astro project with some basic
CRUD operations to create additional resource links.

## Managing dependencies, integrations, and plugins

We recommend **using npm to manage dependencies for this project**. Astro was
designed to be used with npm, and enhanced with plugins and other tools also
hosted on npm. Deno's Node/npm compatibility layer should be able to handle this
just fine. If you run into any compatibility issues,
[please let us know](https://github.com/denoland/deno/issues).

## Using Deno KV

By default, the template project stores data in memory in a
[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).
If you'd like to instead use [Deno KV](https://deno.com/kv) to store your data,
change the `import` statements in these files:

- `src/pages/index.astro`
- `src/pages/api/resources.json.ts`

to use `resources_kv.ts` instead of `resources.ts`. This will work for everyone
locally on recent versions of Deno, but will only work on Deno Deploy if you
have applied for and received access to the beta for KV.

## Caveats and limitations

The Astro build process still runs your Deno code through Vite and esbuild to
generate your SSR site. This means that not all JavaScript and TypeScript
language features will work exactly the same way - most notably,
[HTTPS module imports](https://deno.land/manual@v1.15.2/examples/import_export#remote-import).

If you encounter situations where you require a Deno module that is only
available via HTTPS import, or discover that there's a Deno runtime language
feature that you can't live without, I would recommend writing Deno-specific
code in a separate folder (say `src-deno`) and then using
[dnt](https://github.com/denoland/dnt) to transpile that code into the main
`src` folder, where you can import it in your Astro code. In reality, this
should not be necessary all that often.

This template also uses a patched version of Astro's Deno SSR adapter in
`astro.config.js` - this will eventually be removed once
[this pull request is merged](https://github.com/withastro/astro/pull/7687) and
`@astrojs/deno` is suitable for use!

## License

MIT
