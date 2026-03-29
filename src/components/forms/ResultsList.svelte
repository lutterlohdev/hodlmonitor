<script>
  export let results;
  export let itemToAdd;
</script>
<div class="results">
  <p>Select Crypto</p>
  <ul>
  {#each $results as result}
    <li>
      <button type="button" class="result-button" on:click={() => itemToAdd.set(result)}>
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
    max-width: 600px;
}
li {
  margin-bottom: .4em;
}
.result-button {
  cursor: pointer;
  width: 100%;
  text-align: left;
  background: transparent;
  font: inherit;
  padding: 1em;
  border: 3px solid;
  color: var(--alt-text-color);
  transition: .5s all;
}
.result-button:hover,
.result-button:focus{
  background: var(--alt-text-color);
  color: var(--primary-color);
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
    cursor: pointer;
    padding: 1em;
    border: 3px solid;
    color: var(--primary-color);
    background: var(--secondary-body-color);
    transition: .5s all;
  }
  .result-button:hover,
  .result-button:focus{
    background: var(--alt-text-color);
    color: var(--primary-color);
  }
}
</style>