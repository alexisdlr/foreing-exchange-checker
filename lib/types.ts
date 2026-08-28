import { Favorite } from "./local/db";

export type Currency = {
  iso_code: string;
  iso_numeric: string;
  name: string;
  symbol: string;
  start_date: string;
  end_date: string;
};

export type Rate = {
  date: string;
  base: string;
  quote: string;
  rate: number;
};

export type CurrenciesResponse = Currency[];

export type RatesResponse = Rate[];

export type TimeSeriesResponse = Rate[];

export type FavoriteWithRate = Favorite & {
  rate: number | null;
};
