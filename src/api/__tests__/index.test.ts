import { ChampionsAPI, FreeWeekAPI, SummonerAPI } from "..";

describe("API exports", () => {
  it("should export all API classes", () => {
    expect(ChampionsAPI).toBeDefined();
    expect(FreeWeekAPI).toBeDefined();
    expect(SummonerAPI).toBeDefined();
  });
});
