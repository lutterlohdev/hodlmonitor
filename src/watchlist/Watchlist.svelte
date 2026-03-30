<script>
  import { selectedId, displayData, lastUpdated } from "./store";
  import ListItem from "../components/lists/ListItem.svelte";
  import { fly } from "svelte/transition";
  import { getDollarDisplayValue } from "../utils";
  import ListItemDetails from "../components/lists/ListItemDetails.svelte";
import WatchlistItemOptions from "./WatchlistItemOptions.svelte";

  let screenWidth;

  const handleClick = (id) => {
    if ($selectedId === id) {
      selectedId.set(null);
    } else {
      selectedId.set(id);
    }
  };
</script>

<svelte:window bind:innerWidth={screenWidth} />

<div
  in:fly={{ x: screenWidth, delay: 500 }}
  out:fly={{ x: screenWidth, duration: 500 }}
  role="tabpanel"
  tabindex="0"
  aria-labelledby="watchlist-tab"
  id="watchlist-panel"
>
  {#if $displayData.length > 0}
    <ul>
      {#each $displayData as item}
        <ListItem
          name={item.name}
          value={getDollarDisplayValue(item.price)}
          isSelected={$selectedId === item.id}
          clickHandler={() => handleClick(item.id)}
          dataType={item.priceChange24h?.toString().includes("-") ? "negative" : "positive"}
        >
          <ListItemDetails details={item.details} />
          <WatchlistItemOptions />
        </ListItem>
      {/each}
    </ul>
    <p class="last-updated">Last Updated: {$lastUpdated}</p>
  {:else}
    <p class="instruction">
      Tap the <span class="material-icons">add</span> button above to add a cryptocurrency
      to your watchlist.
    </p>
  {/if}
</div>

<style>
  ul {
    background: var(--secondary-body-color);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    box-shadow: var(--surface-shadow);
    text-align: left;
    margin: 0 1rem;
    padding: 0;
    list-style: none;
    overflow: hidden;
  }
  .last-updated {
    font-size: 0.8em;
    color: color-mix(in srgb, var(--text-color) 75%, transparent);
    text-align: center;
    margin: 1rem;
  }

  .instruction {
    text-align: center;
    margin: 4em 2em 2em;
  }
  .material-icons {
    vertical-align: text-bottom;
  }
</style>
