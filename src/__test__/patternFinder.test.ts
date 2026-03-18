import { test, expect } from 'vitest'
import PatternFinder, { CountData } from '../patternFinder';

test("PatternFinder_lineContainsPatter_Basic", () => {
  var finder = new PatternFinder();
  var line = [
    new CountData(1, 0, 255),
    new CountData(1, 0, 255),
    new CountData(3, 0, 255),
    new CountData(1, 0, 255),
    new CountData(1, 0, 255)];

  var result = finder.lineContainsPattern(line);

  expect(result).toBe(true);
});

