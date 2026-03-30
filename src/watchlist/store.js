import { derived, writable } from "svelte/store";
import {
  fetchJson,
  getDollarDisplayValue,
  getPercentage,
  safeJsonParse,
} from "../utils";
import { snackbar } from "../store";

export const watchlist = createWatchlist();
export const lastUpdated = writable(localStorage.getItem("watchlistLastUpdated") || "");
export const selectedId = writable(null);

const apiResponse = writable([]);

function createWatchlist() {
  const { subscribe, set, update } = writable(safeJsonParse(localStorage.getItem("watchlist"), []));

  return {
    subscribe,
    addItem: (apiData) => {
      update((watchlistArray) => {
        const doesExist = watchlistArray.some((item) => item.id === apiData.id);
        if (!doesExist && apiData != null) {
          const newItem = {
            id: apiData.id,
            name: apiData.name,
            symbol: apiData.symbol.toUpperCase(),
            price: 0,
          };

          return [...watchlistArray, newItem];
        } else {
          throw new Error("Cryptocurrency already already exists in watchlist.");
        }
      });
    },
    updateData: (apiData) => {
      // Price needs to stay part of portfolio and not just displayData or we run into some weird loading issues
      update((watchlistArray) => {
        const index = watchlistArray.findIndex((obj) => obj.id === apiData.id);
        if (index < 0) {
          return watchlistArray;
        }

        watchlistArray[index].price = apiData.current_price;
        watchlistArray[index].ath = apiData.ath;
        watchlistArray[index].priceChange24hPercentage = apiData.price_change_percentage_24h;
        watchlistArray[index].priceChange24h = apiData.price_change_24h;
        return [...watchlistArray];
      });
    },
    removeItem: (id) => {
      update((watchlistArray) =>
        watchlistArray.filter((item) => item.id !== id),
      );
    },
    restoreFromFile: (fileData) => {
      const isArray = Array.isArray(fileData);
      let errorFlag = false;
      if (isArray) {
        // This just checks if the property exists, not the type. Could go that far but probably not needed.
        fileData.forEach((item) => {
          if (!(
            Object.prototype.hasOwnProperty.call(item, "id") &&
            Object.prototype.hasOwnProperty.call(item, "name") &&
            Object.prototype.hasOwnProperty.call(item, "symbol")
          )) {
            errorFlag = true;
          }
        });
      }
      if (!errorFlag) {
        set(fileData);
      } else {
        console.error("Watchlist could not be restored.");
        snackbar.addMessage("Watchlist could not be restored.");
      }
    },
    reset: () => set([]),
  };
}

watchlist.subscribe((value) => {
  localStorage.setItem("watchlist", JSON.stringify(value));
});

export const displayData = derived([watchlist, apiResponse], ([$watchlist, $apiResponse]) => {
  void $apiResponse;
  let returnData = [];

  $watchlist.forEach((item) => {
    const displayItem = {...item};
    const priceChange24hPercentage = getPercentage(item.priceChange24hPercentage, 100);
    const priceChange24h = getDollarDisplayValue(item.priceChange24h);

    displayItem.details = [
      {
        name: "Current Price",
        value: getDollarDisplayValue(item.price),
        dataType: "neutral",
      },
      {
        name: "24hr % Change",
        value: priceChange24hPercentage,
        dataType: priceChange24hPercentage.includes("-") ? "negative" : "positive",
      },
      {
        name: "All Time High",
        value: getDollarDisplayValue(item.ath),
        dataType: "neutral",
      },
      {
        name: "24hr Price Change",
        value: priceChange24h,
        dataType: priceChange24h.includes("-") ? "negative" : "positive",
      },
    ];

    returnData.push(displayItem);
  });

  returnData.sort((a, b) => a.symbol.localeCompare(b.symbol));

  return returnData;
});

export const updateWatchlistPrices = async (symbols) => {
  if (symbols.length > 0) {
    snackbar.addMessage("Watchlist prices refreshing...", 2000);

    const searchParams = new URLSearchParams({
      vs_currency: "usd",
      ids: symbols,
      order: "market_cap_desc",
      per_page: "250",
      page: "1",
      sparkline: "false",
      price_change_percentage: "24h",
    });

    try {
      const json = await fetchJson(`https://api.coingecko.com/api/v3/coins/markets?${searchParams.toString()}`);
      apiResponse.set(json);
    } catch (error) {
      snackbar.addMessage("Error getting current prices.");
      console.error("Error getting current prices.", error);
    }
  }
};

apiResponse.subscribe((value) => {
  if (Array.isArray(value) && value.length > 0) {
    const timestamp = new Date();
    lastUpdated.set(timestamp.toLocaleDateString() + " " + timestamp.toLocaleTimeString());
  }
  value.forEach((item) => {
    watchlist.updateData(item);
  });
});

lastUpdated.subscribe((value) => {
  localStorage.setItem("watchlistLastUpdated", value);
});

export const watchlistSymbols = derived(watchlist, ($watchlist) => {
  return $watchlist.map((item) => item.id).toString();
});

watchlistSymbols.subscribe((value) => {
  updateWatchlistPrices(value);
});
