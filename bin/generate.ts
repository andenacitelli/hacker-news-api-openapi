import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import fs from "node:fs";
import yaml from "yaml";
import {
  OpenAPIRegistry,
  OpenApiGeneratorV31,
} from "@asteasolutions/zod-to-openapi";
import {
  ItemResponseSchema,
  MaxItemResponseSchema,
  STORY_TYPES,
  StoriesResponseSchema,
  UpdatesResponseSchema,
  UserResponseSchema,
} from "./model.js";

extendZodWithOpenApi(z);

const registry = new OpenAPIRegistry();

registry.registerPath({
  method: "get",
  operationId: "getItem",
  path: "/item/{id}.json",
  summary: "Retrieve an item from the API.",
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: ItemResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  operationId: "getUser",
  path: "/user/{id}.json",
  summary: "Retrieve a user from the API.",
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: UserResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  operationId: "getMaxItem",
  path: "/maxitem.json",
  summary: "Retrieve the current largest item id.",
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: MaxItemResponseSchema,
        },
      },
    },
  },
});

for (const storyType of STORY_TYPES) {
  registry.registerPath({
    method: "get",
    operationId: `${storyType}.json`,
    path: `/${storyType}.json`,
    summary: `Retrieve top 500 entries of story type ${storyType}`,
    responses: {
      200: {
        description: "Success",
        content: {
          "application/json": {
            schema: StoriesResponseSchema,
          },
        },
      },
    },
  });
}

registry.registerPath({
  method: "get",
  operationId: "updates",
  path: "/updates.json",
  summary: "Get a list of updates to items and profiles.",
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: UpdatesResponseSchema,
        },
      },
    },
  },
});

const generator = new OpenApiGeneratorV31(registry.definitions);

fs.writeFileSync(
  "exports/api.yaml",
  yaml.stringify(
    generator.generateDocument({
      openapi: "3.1.0",
      info: {
        version: "1.0.0",
        title: "Hacker News API",
        license: {
          name: "MIT",
          url: "https://github.com/HackerNews/API/blob/master/LICENSE",
        },
      },
      security: [],
      servers: [
        {
          url: "https://hacker-news.firebaseio.com/v0",
        },
      ],
    })
  )
);
