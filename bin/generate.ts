import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import fs from "node:fs";
import yaml from "yaml";
import {
  OpenAPIRegistry,
  OpenApiGeneratorV31,
} from "@asteasolutions/zod-to-openapi";
import { ItemSchema, UserSchema } from "./model.js";

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
          schema: ItemSchema,
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
          schema: UserSchema,
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
          schema: z.number().int(),
        },
      },
    },
  },
});

for (const { operationId, path, summary } of [
  {
    operationId: "topstories",
    path: "/topstories.json",
    summary: "Retrieve a list of the 500 top stories",
  },
  {
    operationId: "newstories",
    path: "/newstories.json",
    summary: "Retrieve a list of the 500 newest stories",
  },
  {
    operationId: "beststories",
    path: "/beststories.json",
    summary: "Retrieve a list of the 500 best stories",
  },
  {
    operationId: "askstories",
    path: "/askstories.json",
    summary: "Retrieve a list of 'Ask HN' stories",
  },
  {
    operationId: "showstories",
    path: "/showstories.json",
    summary: "Retrieves list of 'Show HN' stories",
  },
  {
    operationId: "jobstories",
    path: "/jobstories.json",
    summary:
      "Retrieve list of 'Who's hiring' and 'Who wants to be hired' stories",
  },
]) {
  registry.registerPath({
    method: "get",
    operationId,
    path,
    summary,
    responses: {
      200: {
        description: "Success",
        content: {
          "application/json": {
            schema: z.array(z.number().int()),
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
          schema: z.object({
            items: z.array(z.number().int()),
            profiles: z.array(z.number().int()),
          }),
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
