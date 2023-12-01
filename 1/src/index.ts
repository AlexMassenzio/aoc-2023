import * as fs from "fs";
const data = fs.readFileSync("./input.txt", { encoding: "utf8", flag: "r" });

const getCalibrationValue = (input: string) => {
  let firstDigit = -1;
  let lastDigit = -1;

  let indexOfFirstDigit = 0;

  //find first digit
  for (let i = 0; i < input.length; i++) {
    if (input.charCodeAt(i) >= 48 && input.charCodeAt(i) <= 57) {
      firstDigit = +input.charAt(i);
      indexOfFirstDigit = i;
      break;
    }
  }

  //find last digit
  for (let i = input.length - 1; i > indexOfFirstDigit; i--) {
    if (input.charCodeAt(i) >= 48 && input.charCodeAt(i) <= 57) {
      lastDigit = +input.charAt(i);
      break;
    }
  }

  if (lastDigit == -1) {
    lastDigit = firstDigit;
  }

  return firstDigit * 10 + lastDigit;
};

// const line1: string = "pqr3stu8vwx";
// console.log(getCalibrationValue(line1));

let calibrationSum = 0;

data.split("\n").forEach((line) => {
  calibrationSum += getCalibrationValue(line);
});

console.log(calibrationSum);
