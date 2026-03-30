<script>
  import { portfolio } from "../store.js";
  import { cryptoList, snackbar } from "../../store";
  import SearchForm from "../../components/forms/SearchForm.svelte";
  import AmountForm from "../../components/forms/AmountForm.svelte";
  import Overlay from "../../components/Overlay.svelte";
  import ResultsList from "../../components/forms/ResultsList.svelte";
  import HeaderButton from "../../components/buttons/HeaderButton.svelte";

  const MAX_RESULTS = 25;
  let isExpanded = false;
  let searchText = "";
  let results = [];
  let selectedAsset = null;
  let amount = "";
  let errorMessage = "";
  let y = 0;

  const reset = () => {
    isExpanded = false;
    searchText = "";
    results = [];
    selectedAsset = null;
    amount = "";
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

    selectedAsset = null;
    amount = "";
    results = merged;
  };

  const selectAsset = (asset) => {
    selectedAsset = asset;
    errorMessage = "";
  };

  const addHolding = (amountValue) => {
    if (!selectedAsset) {
      errorMessage = "Choose a cryptocurrency first.";
      return;
    }

    if (!Number.isFinite(amountValue) || amountValue <= 0) {
      errorMessage = "Enter a valid amount greater than 0.";
      return;
    }

    try {
      portfolio.addHolding(selectedAsset, amountValue);
      snackbar.addMessage(`${selectedAsset.symbol.toUpperCase()} added to portfolio.`, 2200);
      reset();
    } catch {
      errorMessage = "That cryptocurrency is already in your portfolio.";
    }
  };

</script>

<svelte:window bind:scrollY={y}/>

<HeaderButton on:click={open} >
  <span class="material-icons">
    add
  </span>
</HeaderButton>
{#if isExpanded}
<Overlay title="Add Holding" onClose={reset}>
  <SearchForm
    bind:value={searchText}
    errorMessage={!selectedAsset ? errorMessage : ""}
    onSubmitSearch={searchAssets}
  />

  {#if results.length > 0 && !selectedAsset}
    <ResultsList title="Pick an asset" {results} onSelect={selectAsset} />
  {/if}

  {#if selectedAsset}
    <div class="selected-row">
      <p><strong>{selectedAsset.name}</strong> ({selectedAsset.symbol.toUpperCase()}) selected</p>
      <button type="button" on:click={() => { selectedAsset = null; amount = ""; }}>Choose another</button>
    </div>

    <AmountForm bind:amount currencyName={selectedAsset.name} onSubmitAmount={addHolding} />
  {/if}

  {#if selectedAsset && errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}
</Overlay>
{/if}
<style>
.selected-row {
  margin: 0 auto;
  max-width: 640px;
  padding: 0 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.8em;
}

.selected-row p {
  margin: 0.5em 0;
  overflow-wrap: anywhere;
}

.selected-row button {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-color);
  font: inherit;
  padding: 0.45em 0.7em;
  cursor: pointer;
}

.error {
  text-align: center;
  color: var(--negative);
  margin: 0.6em 0 1.2em;
}
</style>