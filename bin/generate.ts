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
