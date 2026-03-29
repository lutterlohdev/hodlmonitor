<script>
  import { activePane } from "./store.js";
  import Portfolio from "./portfolio/Portfolio.svelte";
  import PortfolioHeaderContent from "./portfolio/PortfolioHeaderContent.svelte";
  import Watchlist from "./watchlist/Watchlist.svelte";
  import WatchlistHeaderContent from "./watchlist/WatchlistHeaderContent.svelte";
  import {onMount} from "svelte";

  const tabs = [
    {
      id: "portfolio",
      name: "Portfolio",
      headerContent: PortfolioHeaderContent,
      icon: "account_balance_wallet",
    },
    {
      id: "watchlist",
      name: "Watchlist",
      headerContent: WatchlistHeaderContent,
      icon: "visibility",
    },
  ];

  activePane.set(tabs[0]);

  let tabsSelector = [];
  
  onMount(async () => {
    tabsSelector = document.querySelectorAll('[role="tab"]');
  });

  let tabFocus = 0;

  // To handle accessibility
  function handleKeyboard(e) {
    if (e.keyCode === 39 || e.keyCode === 37) {
      tabsSelector[tabFocus].setAttribute("tabindex", -1);
      if (e.keyCode === 39) {
        tabFocus++;
        // If we're at the end, go to the start
        if (tabFocus >= tabsSelector.length) {
          tabFocus = 0;
        }
        // Move left
      } else if (e.keyCode === 37) {
        tabFocus--;
        // If we're at the start, move to the end
        if (tabFocus < 0) {
          tabFocus = tabsSelector.length - 1;
        }
      }

      tabsSelector[tabFocus].setAttribute("tabindex", 0);
      tabsSelector[tabFocus].focus();
    }
  }
</script>

<div role="tablist" aria-label="Navigation Tabs">
  {#each tabs as tab}
    <button
      class="tab"
      on:click={() => {
        activePane.set(tab);
      }}
      style="width: {100 / tabs.length}%"
      role="tab"
      aria-selected={$activePane.id == tab.id}
      tabindex={$activePane.id == tab.id ? "0" : "-1"}
      aria-controls="{tab.id}-panel"
      id="{tab.id}-tab"
      on:keydown={handleKeyboard}
    >
      {#if tab.icon}
        <span class="material-icons" aria-hidden="true">{tab.icon}</span>
      {/if}
      <span class="button-text">{tab.name}</span>
      {#if $activePane.id == tab.id}
        <span class="indicator"></span>
      {/if}
    </button>
  {/each}
</div>

<style>
  button {
    box-sizing: border-box;
    color: var(--alt-text-color);
    background: var(--primary-color);
    border: 0;
    text-transform: uppercase;
    padding: 0;
  }
  .material-icons {
    vertical-align: middle;
  }
  .button-text {
    display: inline-block;
    padding: 1em;
  }
  .indicator {
    display: block;
    height: 2px;
    background-color: #fff;
    width: 100%;
    margin-top: -2px;
  }
  @media (prefers-color-scheme: dark) {
    button {
      color: var(--text-color);
      background: var(--body-color);
    }
  }
</style>
