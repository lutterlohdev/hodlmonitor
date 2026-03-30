<script>
	import {activePane, cryptoList, snackbar} from "./store.js";
	import {portfolioSymbols, updatePortfolioPrices} from "./portfolio/store";
	import {watchlistSymbols, updateWatchlistPrices} from "./watchlist/store";
	import Portfolio from "./portfolio/Portfolio.svelte";
	import Watchlist from "./watchlist/Watchlist.svelte";
	import Header from "./Header.svelte";
	import Footer from "./Footer.svelte";
	import Snackbar from "./components/Snackbar.svelte";
	import Tabs from "./Tabs.svelte";
	import {onMount} from "svelte";
	import { fetchJson } from "./utils";
	
	onMount(async () => {
		const refreshPrices = () => {
			updatePortfolioPrices($portfolioSymbols);
			updateWatchlistPrices($watchlistSymbols);
		};

		const interval = setInterval(refreshPrices, 60000);

		const handleOnline = () => {
			snackbar.addMessage("Back online. Prices can refresh again.", 2500);
			refreshPrices();
		};

		const handleOffline = () => {
			snackbar.addMessage("You are offline. Showing last known prices.", 3500);
		};

		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);

		try {
			const data = await fetchJson("https://api.coingecko.com/api/v3/coins/list?include_platform=false", {
				timeout: 15000,
			});
			cryptoList.set(data);
		} catch (error) {
			snackbar.addMessage("Error fetching available cryptocurrencies.");
			console.error("Error getting list of available cryptocurrencies", error);
		}

		return () => {
			clearInterval(interval);
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	});
</script>

<Header />
<main>
	<Tabs />
	{#if $activePane.id === "watchlist"}
	<Watchlist />
	{:else if $activePane.id === "portfolio"} 
		<Portfolio />
	{/if}
	<Snackbar />
</main>
<Footer />

<style>
	main{
		padding-bottom: 4em;
	}
</style>