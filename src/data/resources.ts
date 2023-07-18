import defaultResources from "./default_resources.ts";

export interface Resource {
  url: string;
  title: string;
  summary: string;
}

// Store resources in memory
const RESOURCES = new Map<string, Resource>();

export function addResource(resource: Resource): Promise<Resource> {
  return new Promise((resolve, _reject) => {
    RESOURCES.set(resource.title, resource);
    return resolve(resource);
  });
}

export function listResources(): Promise<Resource[]> {
  return new Promise((resolve, _reject) => {
    const resources = [];
    for (const res of RESOURCES.values()) resources.push(res);
    return resolve(resources);
  });
}

export function deleteResource(title: string) {
  return new Promise((resolve, _reject) => {
    RESOURCES.delete(title);
    return resolve(null);
  });
}

// Bootstrap the database with the default resources
defaultResources.forEach((resource) => {
  addResource(resource);
});
