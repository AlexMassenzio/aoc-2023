import { partData } from "./index.js";

export const getAdjacentPartNumbers = (
  formattedSchematic: string[][],
  symbolX: number,
  symbolY: number
) => {
  let parts: partData[] = [];

  let startX: number = symbolX == 0 ? 0 : symbolX - 1;
  let endX: number =
    symbolX == formattedSchematic[0].length - 1 ? 0 : symbolX + 1;

  let startY: number = symbolY == 0 ? 0 : symbolY - 1;
  let endY: number = symbolY == formattedSchematic.length - 1 ? 0 : symbolY + 1;

  for (let y = startY; y <= endY; y++) {
    for (let x = startX; x <= endX; x++) {
      if (!isNaN(+formattedSchematic[y][x])) {
        parts.push(getPartData(formattedSchematic, x, y));
      }
    }
  }

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

  return parts;
};

export const getPartData = (
  formattedSchematic: string[][],
  partX: number,
  partY: number
) => {
  let foundPart: partData = {
    partNumber: "",
    startingCoordinate: {
      x: partX,
      y: partY,
    },
  };

  for (let index = partX; index < formattedSchematic[partY].length; index++) {
    let currentCoord = formattedSchematic[partY][index];
    if (!isNaN(+currentCoord)) {
      foundPart.partNumber += currentCoord;
    } else {
      break;
    }
  }

  for (let index = partX - 1; index >= 0; index--) {
    let currentCoord = formattedSchematic[partY][index];
    if (!isNaN(+currentCoord)) {
      foundPart.partNumber = currentCoord + foundPart.partNumber;
      foundPart.startingCoordinate.x = index;
    } else {
      break;
    }
  }

  return foundPart;
};

export const prepSchematic = (exampleSchematic: string) => {
  let result: string[][] = [];
  let lines: string[] = exampleSchematic.split("\n");
  lines.forEach((line) => {
    result.push(line.split(""));
  });
  return result;
};
