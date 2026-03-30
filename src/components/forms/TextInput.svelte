<script>
  import InputContainer from "./InputContainer.svelte";
  import Label from "./Label.svelte";
  export let name;
  export let placeholder = "";
  export let value = "";
</script>

<InputContainer>
  <Label name={name}><slot></slot></Label>
  <input required placeholder={placeholder} type="text" name={name} id={name} bind:value autocomplete="off" />
</InputContainer>

<style>
::placeholder {
  color: var(--alt-text-color);
  opacity: .6;
}
input{    
  border: 1px solid color-mix(in srgb, var(--alt-text-color) 50%, transparent);
  border-radius: var(--radius-sm);
  color: var(--alt-text-color);
  background: color-mix(in srgb, var(--secondary-body-color) 12%, transparent);
  outline: 0;
  height: 2.7em;
  font-size: 1.2em;
  margin: .5em;
  padding: 0 0.8em;
}
/*https://css-tricks.com/snippets/css/change-autocomplete-styles-webkit-browsers/*/
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active
{
  border: 1px solid color-mix(in srgb, var(--alt-text-color) 50%, transparent);
  -webkit-text-fill-color: var(--alt-text-color) !important;
 -webkit-box-shadow: 0 0 0 30px color-mix(in srgb, var(--secondary-body-color) 12%, transparent) inset !important;
}

@media(prefers-color-scheme: dark){
  ::placeholder {
    color: var(--primary-color);
    opacity: .6;
  }
  input{    
    border: 1px solid var(--border-color);
    color: var(--primary-color);
    background: color-mix(in srgb, var(--secondary-body-color) 96%, black);
  }
  /*https://css-tricks.com/snippets/css/change-autocomplete-styles-webkit-browsers/*/
  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active
  {
    border: 1px solid var(--border-color);
    -webkit-text-fill-color: var(--primary-color) !important;
  -webkit-box-shadow: 0 0 0 30px color-mix(in srgb, var(--secondary-body-color) 96%, black) inset !important;
  }
}

</style>