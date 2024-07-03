import { test, expect } from "vitest";
import {
  ItemResponseSchema,
  MaxItemResponseSchema,
  STORY_TYPES,
  StoriesResponseSchema,
  UpdatesResponseSchema,
  UserResponseSchema,
} from "./model.js";

const getJsonResponseForUrl = async (url: string): Promise<unknown> => {
  const response = await fetch(url);
  return response.json();
};

test.concurrent("item", async () => {
  const id = 40869877;
  const result = ItemResponseSchema.parse(
    await getJsonResponseForUrl(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    )
  );
  expect(result.id).toBe(id);
});

test.concurrent("user", async () => {
  const id = "dang";
  const result = UserResponseSchema.parse(
    await getJsonResponseForUrl(
      `https://hacker-news.firebaseio.com/v0/user/${id}.json`
    )
  );
  expect(result.id).toBe(id);
});

test.concurrent("maxitem", async () => {
  const result = MaxItemResponseSchema.parse(
    await getJsonResponseForUrl(
      `https://hacker-news.firebaseio.com/v0/maxitem.json`
    )
  );
  expect(result).toBeGreaterThanOrEqual(40870954); // current value as of Jul 3, 6:15pm CT
});

test.each(STORY_TYPES)("%s", async (resource: string) => {
  const result = StoriesResponseSchema.parse(
    await getJsonResponseForUrl(
      `https://hacker-news.firebaseio.com/v0/${resource}.json`
    )
  );
  expect(result).toBeDefined();
  expect(result.length).toBeGreaterThan(0);
});

test.concurrent("updates", async () => {
  const result = UpdatesResponseSchema.parse(
    await getJsonResponseForUrl(
      `https://hacker-news.firebaseio.com/v0/updates.json`
    )
  );
  expect(result.items.length).toBeGreaterThan(0);
  expect(result.profiles.length).toBeGreaterThan(0);
});
