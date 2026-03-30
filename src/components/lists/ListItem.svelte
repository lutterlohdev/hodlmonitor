<script>
  import { fly } from "svelte/transition";

  export let name; 
  export let value; 
  export let isSelected; 
  export let clickHandler;
  export let dataType = null;

  const handleKeyboard = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.target.click();
    }
  };
</script>

<li out:fly={{ x: -200 }}>
  <div
    class="container"
    on:click={clickHandler}
    tabindex="0"
    on:keydown={handleKeyboard}
    role="button"
  >
    <div class="name-container">
      <h2>{name}</h2>
    </div>
    {#if !isSelected}
      <!-- Doing it this way to make the animation nice. Not ideal from a code perspective-->
      <div class="value-container" transition:fly={{ x: 200, duration: 500 }}>
        <span data-type={dataType}>{value}</span>
      </div>
    {/if}
    <span class="material-icons">
      {#if isSelected}
        keyboard_arrow_up
      {:else}
        keyboard_arrow_down
      {/if}
    </span>
  </div>
  {#if isSelected}
    <slot />
  {/if}

</li>


<style>
  h2 {
    font-size: 1.05em;
    font-weight: 600;
    letter-spacing: 0.01em;
    margin: 0;
  }
  li {
    transition: background 0.25s ease;
    border-bottom: 1px solid var(--border-color);
  }

  .container {
    display: flex;
    align-items: center;
    flex: 0 1 auto;
    padding: 0.9em 1em 0.9em 1.1em;
    cursor: pointer;
    gap: 0.75em;
    min-height: 56px;
  }
  .container:hover {
    background: color-mix(in srgb, var(--primary-color) 7%, transparent);
  }
  .name-container {
    flex: 1 1 auto;
    text-align: left;
  }
  .value-container {
    margin-right: 0.25em;
    text-align: center;
    font-weight: 600;
  }
  @media (prefers-color-scheme: dark) {
    .value-container {
      color: var(--primary-color);
    }
  }
</style>
