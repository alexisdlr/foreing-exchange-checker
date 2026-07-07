import {
  CurrenciesResponse,
  Rate,
  RatesResponse,
  TimeSeriesResponse,
} from "./types";

const BASE_URL = "https://api.frankfurter.dev/v2";

export const getCurrencies = async (): Promise<CurrenciesResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/currencies`);
    if (!response.ok) {
      throw new Error("Failed to fetch currencies");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch currencies");
  }
};

export const getLatestRates = async (
  base: string,
  symbols: string[],
): Promise<RatesResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/rates?base=${base}&quotes=${symbols.join(",")}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch latest rates");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch latest rates");
  }
};

export const getRateOnDate = async (
  date: string,
  base: string,
  quotes: string[],
): Promise<RatesResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/rates?date=${date}&base=${base}&quotes=${quotes.join(",")}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch rate on date");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch rate on date");
  }
};

export const getTimeSeries = async (
  start: string,
  end: string,
  base: string,
  quotes: string[],
): Promise<TimeSeriesResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/rates?from=${start}&to=${end}&base=${base}&quotes=${quotes.join(",")}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch time series");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch time series");
  }
};

export const getPairRate = async (from: string, to: string): Promise<Rate> => {
  try {
    const response = await fetch(`${BASE_URL}/rate/${from}/${to}`);
    if (!response.ok) {
      throw new Error("Failed to fetch pair rate");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch pair rate");
  }
};
