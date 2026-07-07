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

export type LatestRatesResponse = {
  base: string;
  rates: Rate[];
  date: string;
};

export type RateOnDateResponse = {
  base: string;
  rates: Rate[];
  date: string;
};
