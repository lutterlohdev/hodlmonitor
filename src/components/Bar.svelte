<script>
  import {slide} from "svelte/transition";
  import HeaderButton from "../components/buttons/HeaderButton.svelte";

  export let closeCallback;
</script>

<div class="bar" transition:slide>
  <div>
    <HeaderButton on:click={closeCallback}>
      <span class="material-icons">
        close
      </span>
    </HeaderButton>
  </div>
  <div>
    <slot></slot>
  </div>
</div>

<style>
  .bar{
    color: var(--alt-text-color);
    background: var(--top-bar-color);
    box-sizing: border-box;
    width: 100%;
    flex: 0 1 auto;
    display: flex;
    padding: 8px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 60;
    box-shadow: 0 1px 4px var(--text-color);
  }
  .bar > div{
    flex: 0 1 auto;
  }
  .bar > div:nth-of-type(1){
    flex: 1 1 auto;
  }

@media(prefers-color-scheme: dark){
  .bar{
    box-shadow: 0 1px 4px #000000;
  }
}
</style>