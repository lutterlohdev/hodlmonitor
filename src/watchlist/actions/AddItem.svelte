<script>
  import { watchlist } from "../store.js";
  import { cryptoList, snackbar } from "../../store";
  import SearchForm from "../../components/forms/SearchForm.svelte";
  import Overlay from "../../components/Overlay.svelte";
  import ResultsList from "../../components/forms/ResultsList.svelte";
  import HeaderButton from "../../components/buttons/HeaderButton.svelte";

  const MAX_RESULTS = 25;
  let isExpanded = false;
  let searchText = "";
  let results = [];
  let errorMessage = "";
  let y = 0;

  const reset = () => {
    isExpanded = false;
    searchText = "";
    results = [];
    errorMessage = "";
  };

  const open = () => {
    reset();
    isExpanded = true;
    y = 0;
  };

  const searchAssets = (rawSearchText) => {
    const normalized = rawSearchText.trim().toUpperCase();
    searchText = rawSearchText;
    errorMessage = "";

    if (!normalized) {
      errorMessage = "Enter a symbol or name to search.";
      results = [];
      return;
    }

    const allAssets = $cryptoList || [];
    const exactMatches = allAssets.filter((asset) => {
      const symbol = asset.symbol?.toUpperCase() || "";
      const name = asset.name?.toUpperCase() || "";
      return symbol === normalized || name === normalized;
    });

    const partialMatches = allAssets.filter((asset) => {
      const symbol = asset.symbol?.toUpperCase() || "";
      const name = asset.name?.toUpperCase() || "";
      return symbol.includes(normalized) || name.includes(normalized);
    });

    const merged = [...exactMatches, ...partialMatches]
      .filter((asset, index, list) => list.findIndex((candidate) => candidate.id === asset.id) === index)
      .slice(0, MAX_RESULTS);

    if (merged.length === 0) {
      errorMessage = "No matching currencies found.";
    }

    results = merged;
  };

  const addToWatchlist = (asset) => {
    errorMessage = "";

    try {
      watchlist.addItem(asset);
      snackbar.addMessage(`${asset.symbol.toUpperCase()} added to watchlist.`, 2200);
      reset();
    } catch {
      errorMessage = "That cryptocurrency is already in your watchlist.";
    }
  };
</script>

<svelte:window bind:scrollY={y} />

<HeaderButton on:click={open}>
  <span class="material-icons"> add </span>
</HeaderButton>
{#if isExpanded}
  <Overlay title="Add Crypto" onClose={reset}>
    <SearchForm
      bind:value={searchText}
      errorMessage={errorMessage}
      onSubmitSearch={searchAssets}
    />

    {#if results.length > 0}
      <ResultsList title="Pick an asset" {results} onSelect={addToWatchlist} />
    {/if}

    {#if errorMessage && results.length > 0}
      <p class="error">{errorMessage}</p>
    {/if}
  </Overlay>
{/if}

<style>
  .error {
    text-align: center;
    color: var(--negative);
    margin: 0.6em 0 1.2em;
  }
</style>
