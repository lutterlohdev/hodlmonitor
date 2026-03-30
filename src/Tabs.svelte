<script>
  import { activePane } from "./store.js";
  import PortfolioHeaderContent from "./portfolio/PortfolioHeaderContent.svelte";
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

  const findTabById = (id) => tabs.find((tab) => tab.id === id) || tabs[0];

  const selectTab = (tab, syncHash = true) => {
    activePane.set(tab);

    if (syncHash && window.location.hash !== `#${tab.id}`) {
      history.replaceState(null, "", `#${tab.id}`);
    }
  };

  selectTab(tabs[0], false);

  let tabsSelector = [];
  
  onMount(() => {
    tabsSelector = document.querySelectorAll('[role="tab"]');

    const initialHash = window.location.hash.replace("#", "");
    if (initialHash) {
      selectTab(findTabById(initialHash), false);
    }

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        selectTab(findTabById(hash), false);
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  });

  let tabFocus = 0;

  // To handle accessibility
  function handleKeyboard(e) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      tabsSelector[tabFocus].setAttribute("tabindex", -1);
      if (e.key === "ArrowRight") {
        tabFocus++;
        // If we're at the end, go to the start
        if (tabFocus >= tabsSelector.length) {
          tabFocus = 0;
        }
      } else if (e.key === "ArrowLeft") {
        tabFocus--;
        // If we're at the start, move to the end
        if (tabFocus < 0) {
          tabFocus = tabsSelector.length - 1;
        }
      }

      tabsSelector[tabFocus].setAttribute("tabindex", 0);
      tabsSelector[tabFocus].focus();
      selectTab(tabs[tabFocus]);
    }
  }
</script>

<div role="tablist" aria-label="Navigation Tabs">
  {#each tabs as tab}
    <button
      class="tab"
      on:click={() => {
        selectTab(tab);
      }}
      style="width: {100 / tabs.length}%"
      role="tab"
      aria-selected={$activePane.id === tab.id}
      tabindex={$activePane.id === tab.id ? "0" : "-1"}
      aria-controls="{tab.id}-panel"
      id="{tab.id}-tab"
      on:keydown={handleKeyboard}
    >
      {#if tab.icon}
        <span class="material-icons" aria-hidden="true">{tab.icon}</span>
      {/if}
      <span class="button-text">{tab.name}</span>
      {#if $activePane.id === tab.id}
        <span class="indicator"></span>
      {/if}
    </button>
  {/each}
</div>

<style>
  button {
    color: var(--alt-text-color);
    background: color-mix(in srgb, var(--primary-color) 90%, black 10%);
    border: 0;
    border-bottom: 1px solid color-mix(in srgb, var(--border-color) 75%, transparent);
    text-transform: uppercase;
    padding: 0;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  button:hover {
    background: color-mix(in srgb, var(--primary-color) 80%, black 20%);
  }
  .material-icons {
    vertical-align: middle;
    font-size: 20px;
  }
  .button-text {
    display: inline-block;
    padding: 0.95em 0.75em;
    font-size: 0.85em;
    letter-spacing: 0.04em;
  }
  .indicator {
    display: block;
    height: 3px;
    background-color: currentColor;
    width: 100%;
    margin-top: -3px;
    border-radius: 999px;
  }
  @media (prefers-color-scheme: dark) {
    button {
      color: var(--text-color);
      background: color-mix(in srgb, var(--body-color) 94%, black);
    }
    button:hover {
      background: color-mix(in srgb, var(--body-color) 88%, black);
    }
  }
</style>
