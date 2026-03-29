<script>
  import { fly } from "svelte/transition";
  import HeaderButton from "./buttons/HeaderButton.svelte";

  export let isSidebarOpen = false;

  const closeSidebar = () => (isSidebarOpen = !isSidebarOpen);

  const handleOverlayKeyboard = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      closeSidebar();
    }
  };
</script>

{#if isSidebarOpen}
  <aside transition:fly={{ x: -200, duration: 500 }} class:open={isSidebarOpen}>
    <div>
      <HeaderButton on:click={() => (isSidebarOpen = false)}>
        <span class="material-icons"> close </span>
      </HeaderButton>
    </div>

    <slot />
  </aside>
  <div
    class="overlay"
    on:click={closeSidebar}
    on:keydown={handleOverlayKeyboard}
    role="button"
    tabindex="0"
    aria-label="Close sidebar"
  ></div>
{/if}

<style>
  aside {
    top: 0;
    height: 100vh;
    width: 30vw;
    position: fixed;
    background: var(--primary-color);
    color: var(--alt-text-color);
    z-index: 99998;
    overflow: scroll;
  }
  .open {
    left: 0;
    box-shadow: var(--border-color);
  }
  aside > div:first-of-type {
    position: absolute;
    right: 0;
    top: 0;
    padding: 8px;
  }
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9997;
  }
  @media only screen and (max-width: 768px) {
    aside {
      width: 90vw;
    }
    .open {
      left: 0;
    }
  }

  @media (prefers-color-scheme: dark) {
    aside {
      background: var(--secondary-body-color);
      color: var(--text-color);
    }
  }
</style>
