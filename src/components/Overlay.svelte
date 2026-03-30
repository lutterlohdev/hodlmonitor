<script>
  import { fly } from "svelte/transition";
  import HeaderButton from "./buttons/HeaderButton.svelte";

  export let title;
  export let onClose;

  const portal = (node) => {
    const target = document.body;
    target.appendChild(node);

    return {
      destroy() {
        if (node.parentNode === target) {
          target.removeChild(node);
        }
      },
    };
  };
</script>

<div class="overlay" use:portal in:fly={{ y: 80 }} out:fly={{ y: 80 }}>
  <button class="backdrop" type="button" aria-label="Close" on:click={onClose}></button>
  <div class="panel" role="dialog" aria-modal="true" aria-label={title}>
    <div class="header">
      <div>
        <h2>{title}</h2>
      </div>
      <div>
        <HeaderButton on:click={onClose}>
          <span class="material-icons"> close </span>
        </HeaderButton>
      </div>
    </div>
    <div class="body">
      <slot />
    </div>
  </div>
</div>

<style>
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 99999999;
    display: grid;
    align-items: start;
    justify-items: center;
    padding: calc(env(safe-area-inset-top, 0px) + 0.75rem) 1rem 1rem;
    overflow: auto;
  }
  .backdrop {
    border: 0;
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
  }
  .panel {
    width: min(720px, 100%);
    max-height: calc(100dvh - env(safe-area-inset-top, 0px) - 1.75rem);
    overflow: hidden;
    position: relative;
    border-radius: var(--radius-md);
    border: 1px solid var(--border-color);
    background: linear-gradient(180deg, var(--top-bar-color), var(--primary-color));
    color: var(--alt-text-color);
    box-shadow: var(--surface-shadow);
  }
  .header {
    display: flex;
    align-items: center;
    padding: 10px 12px;
    position: sticky;
    top: 0;
    z-index: 1;
    background: color-mix(in srgb, var(--primary-color) 92%, black 8%);
  }
  .header div {
    flex: 0 1 auto;
  }
  .header div:first-of-type {
    flex: 1 1 auto;
  }
  h2 {
    color: var(--alt-text-color);
    display: block;
    margin: 0;
    padding: 8px;
    font-size: 16px;
    text-transform: uppercase;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 24px;
    text-align: left;
  }
  .body {
    padding: 0.2rem 0 1rem;
    max-height: calc(100dvh - env(safe-area-inset-top, 0px) - 7rem);
    overflow: auto;
  }

  @media (max-width: 640px) {
    .overlay {
      padding: calc(env(safe-area-inset-top, 0px) + 0.25rem) 0.4rem 0.6rem;
    }
    .panel {
      width: 100%;
      max-height: calc(100dvh - env(safe-area-inset-top, 0px) - 0.9rem);
    }
  }
  @media (prefers-color-scheme: dark) {
    .panel {
      background: var(--secondary-body-color);
      color: var(--text-color);
    }
    .header {
      background: color-mix(in srgb, var(--secondary-body-color) 94%, black);
    }
    h2 {
      color: var(--text-color);
    }
  }
</style>
