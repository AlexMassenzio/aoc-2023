import { expect, test, describe } from "vitest";
import { part1, part2 } from "./index.js";
import * as fs from "fs";

const exampleSchematic: string = fs.readFileSync("./exampleSchematic.txt", {
  encoding: "utf8",
  flag: "r",
});

test("should match example input to part 1 example solution", () => {
  expect(part1(exampleSchematic)).toBe(4361);
});

test("should match example input to part 2example solution", () => {
  expect(part2(exampleSchematic)).toBe(467835);
});
