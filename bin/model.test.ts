import { test, expect } from "vitest";
import { ItemSchema, UserSchema } from "./model.js";

test("Story", async () => {
  const id = 40869877;
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );
  const json = await response.json();
  const result = ItemSchema.parse(json);
  expect(result.id).toBe(id);
});

test("User", async () => {
  const id = "dang";
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/user/${id}.json`
  );
  const json = await response.json();
  const result = UserSchema.parse(json);
  expect(result.id).toBe(id);
});
