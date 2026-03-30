<script>
  import RefreshButton from "./components/buttons/RefreshButton.svelte";
  import DataMenu from "./settings/DataMenu.svelte";
  import {activePane} from "./store";
</script>

<header>
  <div>
    <DataMenu />
  </div>
  <div>
    <h1>HODL Monitor</h1>
  </div>
  <div>
    <RefreshButton />
    <svelte:component this={$activePane.headerContent} />
  </div>
</header>

<style>
  header{
    color: var(--alt-text-color);
    background: linear-gradient(180deg, var(--top-bar-color), var(--primary-color));
    width: 100%;
    flex: 0 1 auto;
    display: flex;
    align-items: center;
    padding: 10px 12px;
    position: sticky;
    top: 0;
    z-index: 20;
    backdrop-filter: saturate(160%) blur(8px);
    border-bottom: 1px solid color-mix(in srgb, var(--border-color) 60%, transparent);
  }
  div{
    flex: 0 1 auto;
  }
  div:nth-of-type(2){
    flex: 1 1 auto;
  }
  h1{
    display: block;
    margin: 0;
    padding: 8px 10px;
    font-size: 17px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 24px;
  }
  @media(prefers-color-scheme: dark){
    header{
      color: var(--text-color);
      background: color-mix(in srgb, var(--body-color) 88%, black);
    }
  }
</style>