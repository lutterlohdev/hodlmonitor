<script>
  export let title;
  export let value;
</script>

<div>
  <h2>{title}</h2> 
  <p>{value}</p>
</div>

<style>
  div{
    background:var(--total-value-color);
    color: var(--alt-text-color);
    margin: 1rem;
    border-radius: var(--radius-md);
    box-shadow: var(--surface-shadow);
    padding: 1.5em 1em;
    text-align: center;
  }
  h2{
    font-size: 1em;
    font-weight: 500;
    opacity: 0.9;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin: 0;
  }
  p{
    color:var(--alt-text-color);
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    font-weight: 700;
    margin: 0.2em 0 0;
  }
  @media(prefers-color-scheme: dark){
    div{
      background:var(--total-value-color);
      color: var(--primary-color);
      border-bottom: 1px solid var(--border-color);
    }
    h2{
      color: var(--text-color);
    }
    p{
      color: var(--primary-color);
    }
  }
</style>