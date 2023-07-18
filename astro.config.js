import { defineConfig } from "astro/config";
// Eventually, replace this import with the official one - we're using a
// patched version for now.
// import deno from "@astrojs/deno";
import deno from "deno-astro-adapter";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: deno(),
});
