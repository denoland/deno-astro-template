// Rather than vendoring the path utility from Deno:
// "https://deno.land/std@0.194.0/path/mod.ts";
// We can use the node:path module, which is usable in Deno/Deno Deploy
import { join } from "node:path";
import defaultResources from "./default_resources.js";

// Init Deno KV database path
let kvPath;
if (!Deno.env.get("DENO_DEPLOYMENT_ID")) {
  // In non-Deno Deploy environments, use a local folder in the current working
  // directory for data storage
  const kvDir = join(Deno.cwd(), ".kv");

  try {
    await Deno.mkdir(kvDir, { recursive: true, mode: 0o777 });
  } catch (err) {
    // Already existing is fine, throw others though
    if (err.name !== "AlreadyExists") {
      throw err;
    }
  }

  kvPath = join(kvDir, "kv.db");
}

const db = await Deno.openKv(kvPath);

export interface Resource {
  url: string;
  title: string;
  summary: string;
}

export async function addResource(resource: Resource) {
  return await db.set(["resources", resource.title], resource);
}

export async function listResources(): Promise<Resource[]> {
  const iter = db.list({ prefix: ["resources"] });
  const resources = [];
  for await (const res of iter) resources.push(res.value as Resource);
  return resources;
}

export async function deleteResource(title: string) {
  return await db.delete(["resources", title]);
}

// Bootstrap the database with the default resources
defaultResources.forEach((resource) => {
  addResource(resource);
});
