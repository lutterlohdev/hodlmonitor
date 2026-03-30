<script>
  import { fade } from "svelte/transition";
  import { snackbar } from "../store";

  const handleDismissKeyboard = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      snackbar.dismiss();
    }
  };
</script>

{#if $snackbar.length > 0}
  <div
    transition:fade
    on:click={() => snackbar.dismiss()}
    on:keydown={handleDismissKeyboard}
    role="button"
    tabindex="0"
    aria-label="Dismiss messages"
    aria-live="polite"
  >
    <h2 class="sr-only">Informational Messages (Click to dismiss):</h2>
    <ul>
      {#each $snackbar as message (message.id)}
        <li>{message.text}</li>
      {/each}
    </ul>
  </div>
{/if}

<style>
  div {
    display: block;
    width: 100%;
    position: fixed;
    bottom: 3em;
    z-index: 9999999;
  }
  ul {
    background: rgba(0, 0, 0, 0.8);
    list-style: none;
    padding: 0;
    margin: 0 auto;
    box-shadow: 0 0 3px var(--border-color);
    max-width: 400px;
    border-radius: 4px;
  }
  li {
    color: var(--alt-text-color);
    padding: 1em 1em 0;
  }
  li:last-of-type {
    padding-bottom: 1em;
  }
  @media (prefers-color-scheme: dark) {
    li {
      color: var(--primary-color);
    }
    ul {
      background: rgba(0, 0, 0, 1);
    }
  }
</style>
