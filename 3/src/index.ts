import * as fs from "fs";
import { getAdjacentPartNumbers, prepSchematic } from "./helpers.js";

export type partData = {
  partNumber: string;
  startingCoordinate: {
    x: number;
    y: number;
  };
};

export const part1 = (schematic: string) => {
  let sum = 0;

  let parts: partData[] = [];

  let formattedSchematic = prepSchematic(schematic);

  formattedSchematic.forEach((line, y) => {
    line.forEach((character, x) => {
      if (isNaN(+character) && character != ".") {
        parts = parts.concat(getAdjacentPartNumbers(formattedSchematic, x, y));
      }
    });
  });

  // remove duplicates
  parts = parts.filter(
    (part, index, arr) =>
      index ===
      arr.findIndex(
        (other) =>
          other.partNumber === part.partNumber &&
          other.startingCoordinate.x === part.startingCoordinate.x &&
          other.startingCoordinate.y === part.startingCoordinate.y
      )
  );

  parts.forEach((part) => {
    sum += +part.partNumber;
  });

  return sum;
};

export const part2 = (schematic: string) => {
  let sum = 0;

  let parts: partData[] = [];

  let formattedSchematic = prepSchematic(schematic);

  let gears: partData[] = [];

  formattedSchematic.forEach((line, y) => {
    line.forEach((character, x) => {
      if (character == "*") {
        gears = getAdjacentPartNumbers(formattedSchematic, x, y);

        if (gears.length == 2) {
          sum += +gears[0].partNumber * +gears[1].partNumber;
        }
      }
    });
  });

  return sum;
};

const input: string = fs.readFileSync("./input.txt", {
  encoding: "utf8",
  flag: "r",
});

console.log("part 1: " + part1(input));
console.log("part 2: " + part2(input));
