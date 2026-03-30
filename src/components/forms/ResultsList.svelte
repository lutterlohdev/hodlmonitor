<script>
  export let title = "Select a cryptocurrency";
  export let results = [];
  export let onSelect = () => {};
</script>
<div class="results">
  <p>{title}</p>
  <ul>
  {#each results as result}
    <li>
      <button type="button" class="result-button" on:click={() => onSelect(result)}>
        {result.name} ({result.symbol.toUpperCase()})
        <span class="material-icons">add</span>
      </button>
    </li>
  {/each}
  </ul>
</div>

<style>
  p{
    display: block;
    font-weight: normal;
    font-size: 1.1em;
    text-align: center;
} 
  
ul{
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 640px;
}
li {
  margin-bottom: .4em;
}
.result-button {
  cursor: pointer;
  width: 100%;
  text-align: left;
  background: color-mix(in srgb, var(--secondary-body-color) 92%, transparent);
  font: inherit;
  padding: 0.9em 1em;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-color);
  transition: 0.25s all;
}
.result-button:hover,
.result-button:focus{
  background: color-mix(in srgb, var(--primary-color) 12%, transparent);
  border-color: color-mix(in srgb, var(--primary-color) 60%, var(--border-color));
}
.result-button:active{
  transform: scale(.95)
}
.result-button > span{
  float: right;
}
p{
  text-align: center;
  margin: 1em;
}
.results{
  margin: 0 1em;
}


@media(prefers-color-scheme: dark){
  .result-button {
    border: 1px solid var(--border-color);
    color: var(--primary-color);
    background: color-mix(in srgb, var(--secondary-body-color) 98%, black);
    transition: 0.25s all;
  }
  .result-button:hover,
  .result-button:focus{
    background: color-mix(in srgb, var(--primary-color) 14%, transparent);
    color: var(--primary-color);
  }
}
</style>