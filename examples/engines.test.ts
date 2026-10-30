import { describe, expect, it } from "vitest";
import {
  demoBotTimestamps,
  demoHumanTimestamps,
  fingerprintTemporal,
} from "./engines";

describe("fingerprintTemporal", () => {
  it("bot demo has high coverage",
    () => {
      const s = fingerprintTemporal(demoBotTimestamps(90), { timeZone: "UTC" });
      expect(s.totalActions).toBe(90);
      expect(s.occupiedCellRatio).toBeGreaterThan(0.3);
    });

  it("human demo has actions and flags",
    () => {
      const s = fingerprintTemporal(demoHumanTimestamps(90), {
        timeZone: "UTC",
      });
      expect(s.totalActions).toBe(90);
      expect(s.flags.length).toBeGreaterThan(0);
    });
});
