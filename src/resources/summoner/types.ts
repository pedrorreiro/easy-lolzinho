export type GetSummonerResponse = {
  id: string;
  accountId: string;
  puuid: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
};

export type SummonerDTO = {
  id: string;
  accountId: string;
  puuid: string;
  profileIconId: number;
  revisionDate: Date;
  summonerLevel: number;
  profileIconUrl: string;
};
