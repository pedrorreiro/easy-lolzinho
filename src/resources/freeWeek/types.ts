export type GetFreeWeekResponse = {
  freeChampionsIds: number[];
  freeChampionsIdsForNewPlayers: number[];
  maxNewPlayerLevel: number;
};

export type FreeWeekDto = GetFreeWeekResponse;
