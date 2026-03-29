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
    font-size: 1.2em;
    font-weight: normal;
    margin: 0;
  }
  li {
    transition: all 0.5s;
    border-bottom: thin solid var(--border-color);
  }
  /* .container:focus{
    outline: var(--primary-color) 1px dotted;
  } */
  .container {
    display: flex;
    align-items: center;
    flex: 0 1 auto;
    padding: 1em 0.8em 1em 1.4em;
    cursor: pointer;
  }
  .name-container {
    flex: 1 1 auto;
    text-align: left;
  }
  .value-container {
    margin-right: 1em;
    text-align: center;
  }
  @media (prefers-color-scheme: dark) {
    .value-container {
      color: var(--primary-color);
    }
  }
</style>
