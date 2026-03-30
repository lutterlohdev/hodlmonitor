<script>
  import NumberInput from "./NumberInput.svelte";
  import ButtonContainer from "../buttons/ButtonContainer.svelte";
  import FormButton from "../buttons/FormButton.svelte";

  export let amount = "";
  export let currencyName;
  export let onSubmitAmount = () => {};

  function submit() {
    onSubmitAmount(Number(amount));
  }
</script>

<form on:submit|preventDefault={submit}>
  <NumberInput bind:value={amount} name="amount">What amount of {currencyName} do you hold?</NumberInput>
  <ButtonContainer>
    <FormButton type="submit" disabled={!amount || Number(amount) <= 0}>Add to Portfolio</FormButton>
  </ButtonContainer>
</form>

<style>
  form{
    padding: 1em;
    box-sizing: border-box;
    margin: 0 auto;
    max-width: 640px;
  }
</style>