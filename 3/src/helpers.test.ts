import { expect, test, describe } from "vitest";
import { partData } from "./index.js";
import {
  getAdjacentPartNumbers,
  prepSchematic,
  getPartData,
} from "./helpers.js";
import * as fs from "fs";

const exampleSchematic: string = fs.readFileSync("./exampleSchematic.txt", {
  encoding: "utf8",
  flag: "r",
});

describe("given a small 4x2 schematic", () => {
  test("should output a 2d array of characters", () => {
    const input = "467.\n...*";
    const expectedResult = [
      ["4", "6", "7", "."],
      [".", ".", ".", "*"],
    ];
    expect(prepSchematic(input)).toEqual(expectedResult);
  });
});

describe("given the location of a valid symbol", () => {
  test("should find two adjacent numbers", () => {
    const expectedResult: partData[] = [
      {
        partNumber: "467",
        startingCoordinate: {
          x: 0,
          y: 0,
        },
      },
      {
        partNumber: "35",
        startingCoordinate: {
          x: 2,
          y: 2,
        },
      },
    ];

    expect(
      getAdjacentPartNumbers(prepSchematic(exampleSchematic), 3, 1)
    ).toEqual(expectedResult);
  });
});

describe("given the location of a valid symbol", () => {
  test("should find two adjacent numbers", () => {
    const expectedResult: partData = {
      partNumber: "467",
      startingCoordinate: {
        x: 0,
        y: 0,
      },
    };
    expect(getPartData(prepSchematic(exampleSchematic), 2, 0)).toEqual(
      expectedResult
    );
  });
});
