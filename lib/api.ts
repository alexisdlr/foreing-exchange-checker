const BASE_URL = "https://api.frankfurter.dev/v2";

export const getCurrencies = async () => {
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

export const getLatestRates = async (base: string, symbols: string[]) => {
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
  symbols: string[],
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/rates?date=${date}&base=${base}&quotes=${symbols.join(",")}`,
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
  symbols: string[],
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/timeseries?start=${start}&end=${end}&base=${base}&quotes=${symbols.join(",")}`,
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
