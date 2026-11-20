import { describe, expect, it } from "vitest";
import {
  demoBotTimestamps,
  demoHumanTimestamps,
  fingerprintTemporal,
} from "./engines";

describe("fingerprintTemporal", () => {
  it("bot demo covers 67 of 168 cells and raises no structural flag", () => {
    const s = fingerprintTemporal(demoBotTimestamps(90), { timeZone: "UTC" });
    expect(s.totalActions).toBe(90);
    expect(s.occupiedCellRatio).toBe(67 / 168);
    expect(s.flags.map((flag) => flag.id)).toEqual(["neutral"]);
  });

  it("human demo covers 75 of 168 cells and also stays neutral", () => {
    const s = fingerprintTemporal(demoHumanTimestamps(90), { timeZone: "UTC" });
    expect(s.totalActions).toBe(90);
    expect(s.occupiedCellRatio).toBe(75 / 168);
    expect(s.flags.map((flag) => flag.id)).toEqual(["neutral"]);
  });
});
