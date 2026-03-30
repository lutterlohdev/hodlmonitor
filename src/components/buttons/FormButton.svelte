<script>
  export let type;
  export let disabled = false;
</script>

<button type={type} {disabled} on:click><slot></slot></button>

<style>
button {
  box-sizing: border-box;
  margin: 1em auto;
  display: block;
  background: var(--primary-color);
  color: var(--alt-text-color);
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  border: 2px solid color-mix(in srgb, var(--alt-text-color) 85%, transparent);
  border-radius: var(--radius-sm);
  padding: 0.9em 0;
  transition: 0.2s all;
  width: 100%;
  max-width: 400px;
  font-size: .9em;
  text-decoration: none;
  text-align: center;
}
button:hover, button:focus {
  background: var(--alt-text-color);
  color:  var(--primary-color);
}
button:active {
  transform: scale(.95);
}
button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
button:disabled:hover,
button:disabled:focus {
  background: var(--primary-color);
  color: var(--alt-text-color);
}

@media(prefers-color-scheme: dark){
  button {
    background: var(--secondary-body-color);
    color: var(--text-color);
    border: 2px solid var(--border-color);
  }
  button:hover, button:focus {
    background: var(--text-color);
    color:  var(--secondary-body-color);
  }
  button:disabled:hover,
  button:disabled:focus {
    background: var(--secondary-body-color);
    color: var(--text-color);
  }

}

</style>