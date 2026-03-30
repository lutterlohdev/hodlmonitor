# HODL Monitor

## 2026 Refresh

This project has been refreshed for a modern browser stack:

- Updated visual design system (light + dark palettes, improved spacing, stronger accessibility focus states)
- Modernized JavaScript data/fetch layer (timeouts, safer JSON parsing, stricter comparisons)
- Improved PWA setup (enhanced manifest metadata, shortcuts, runtime caching for API/images/fonts, navigation fallback)
- More robust service worker lifecycle (update checks + automatic refresh when a new worker activates)

HODL Monitor provides a single place to view and monitor your crypto holdings as well as a customizable watchlist without the need for another account, a complicated signup, API keys, or another password to remember.

This app runs in the browser and relies on your browser's LocalStorage to remember your portfolio. The only external service calls are to get current prices and fonts (the app doesn't send your data anywhere).

HODL Monitor is purposefully rudimentary in functionality as it was built as a reaction to the annoyingly over-cluttered folio apps available and the API keys (read: security risks) they required.

Creator note: This app is not going to be for everyone. It lacks historical trends, value over time, and other common folio features. In fact, it is probably only useful if you are hodling across a few different wallets/services and simply want one place to monitor the current value of your holdings. If this fits your use case, I hope you enjoy.

## Demo

[Live Demo](https://hodl.lutterloh.dev)

## Getting Started

### Installation

1. Clone the repo
2. `cd hodlmonitor`
3. Run `npm install`
4. Run `npm run dev`
5. Go to `http://localhost:5173` (this port may be different on your machine)

For a production preview after building, run `npm run preview`.

_Voila!_

## Additional Notes

I used CoinGecko's API for the data since they provide it without requiring an API key (which is amazing). Link [CoinGecko](https://www.coingecko.com/en/api).
