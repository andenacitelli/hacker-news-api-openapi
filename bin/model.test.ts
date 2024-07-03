import { test, expect } from "vitest";
import { ItemSchema } from "./model.js";

test("Validate real item", async () => {
  const id = 40869877;
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );
  const json = await response.json();
  const result = ItemSchema.parse(json);
  expect(result.id).toBe(id);
});
