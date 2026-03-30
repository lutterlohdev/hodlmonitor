<script>
  import TextInput from "./TextInput.svelte";
  import ButtonContainer from "../buttons/ButtonContainer.svelte";
  import FormButton from "../buttons/FormButton.svelte";
  export let value = "";
  export let placeholder = "BTC, Bitcoin, ETH...";
  export let submitLabel = "Search";
  export let disabled = false;
  export let errorMessage = "";
  export let onSubmitSearch = () => {};

  const submit = () => {
    onSubmitSearch(value.trim());
  };
</script>

<form on:submit|preventDefault={submit}>
  <TextInput bind:value name="search" {placeholder}>Cryptocurrency Name or Symbol</TextInput>
  <ButtonContainer>
    <FormButton type="submit" disabled={disabled}>{submitLabel}</FormButton>
  </ButtonContainer>
</form>
<div class="results">
  {#if errorMessage}
    <p>{errorMessage}</p>
  {/if}
</div>

<style>

  form{
    padding: 1em;
    box-sizing: border-box;
    margin: 0 auto;
    max-width: 640px;
  }

p{
  text-align: center;
  margin: 0.5em 1em 1em;
}
div{
  margin: 0 1em;
}

</style>