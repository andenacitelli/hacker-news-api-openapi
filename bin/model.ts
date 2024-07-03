import { z } from "zod";

export const STORY_TYPES = [
  "topstories",
  "newstories",
  "beststories",
  "askstories",
  "showstories",
  "jobstories",
];

export const ItemResponseSchema = z.object({
  id: z.number().int().describe("The item's unique id."),
  deleted: z.boolean().optional().describe("`true` if the item is deleted."),
  type: z
    .enum(["job", "story", "comment", "poll", "pollopt"])
    .optional()
    .describe("The type of the item."),
  by: z.string().optional().describe("The username of the item's author."),
  time: z
    .number()
    .int()
    .optional()
    .describe("Creation date of the item, in Unix Time."),
  text: z
    .string()
    .optional()
    .describe("The comment, story or poll text. HTML."),
  dead: z.boolean().optional().describe("`true` if the item is dead."),
  parent: z
    .number()
    .int()
    .optional()
    .describe(
      "The comment's parent: either another comment or the relevant story."
    ),
  poll: z.any().describe("The pollopt's associated poll."),
  kids: z
    .array(z.number().int())
    .optional()
    .describe("The ids of the item's comments, in ranked display order."),
  url: z.string().optional().describe("The URL of the story."),
  score: z
    .number()
    .int()
    .optional()
    .describe("The story's score, or the votes for a pollopt."),
  title: z
    .string()
    .optional()
    .describe("The title of the story, poll or job. HTML."),
  parts: z
    .array(
      z.number().int().describe("A list of related pollopts, in display order.")
    )
    .optional(),
  descendants: z
    .number()
    .optional()
    .describe("In the case of stories or polls, the total comment count."),
});

export const UserResponseSchema = z.object({
  id: z
    .string()
    .describe("The user's unique username. Case-sensitive. Required."),
  created: z
    .number()
    .int()
    .describe(
      "Creation date of the user, in [Unix Time](http://en.wikipedia.org/wiki/Unix_time)."
    ),
  karma: z.number().int().describe("The user's karma."),
  about: z
    .string()
    .optional()
    .describe("The user's optional self-description. HTML."),
  submitted: z
    .array(z.number().int())
    .optional()
    .describe("List of the user's stories, polls and comments."),
});

export const MaxItemResponseSchema = z.number().int();

export const StoriesResponseSchema = z.array(z.number().int());

export const UpdatesResponseSchema = z.object({
  items: z.array(z.number().int()),
  profiles: z.array(z.string()),
});
