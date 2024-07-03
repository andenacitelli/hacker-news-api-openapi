import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import fs from "node:fs";
import yaml from "yaml";
import {
  OpenAPIRegistry,
  OpenApiGeneratorV31,
} from "@asteasolutions/zod-to-openapi";

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
          schema: z.object({
            id: z.string().describe("The item's unique id."),
            deleted: z
              .boolean()
              .nullable()
              .describe("`true` if the item is deleted."),
            type: z
              .enum(["job", "story", "comment", "poll", "pollopt"])
              .nullable()
              .describe("The type of the item."),
            by: z
              .string()
              .nullable()
              .describe("The username of the item's author."),
            time: z
              .number()
              .int()
              .nullable()
              .describe("Creation date of the item, in Unix Time."),
            text: z
              .string()
              .nullable()
              .describe("The comment, story or poll text. HTML."),
            dead: z
              .boolean()
              .nullable()
              .describe("`true` if the item is dead."),
            parent: z
              .number()
              .int()
              .nullable()
              .describe(
                "The comment's parent: either another comment or the relevant story."
              ),
            poll: z.any().describe("The pollopt's associated poll."),
            kids: z
              .array(z.number().int())
              .nullable()
              .describe(
                "The ids of the item's comments, in ranked display order."
              ),
            url: z.string().describe("The URL of the story."),
            score: z
              .number()
              .int()
              .nullable()
              .describe("The story's score, or the votes for a pollopt."),
            title: z
              .string()
              .nullable()
              .describe("The title of the story, poll or job. HTML."),
            parts: z.array(
              z
                .number()
                .int()
                .nullable()
                .describe("A list of related pollopts, in display order.")
            ),
            descendants: z
              .array(z.number().int())
              .nullable()
              .describe(
                "In the case of stories or polls, the total comment count."
              ),
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
          url: " https://hacker-news.firebaseio.com/v0",
        },
      ],
    })
  )
);
