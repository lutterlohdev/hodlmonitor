<button type="button" on:click>
  <slot></slot>
</button>

<style>
  button{
    background: transparent;
    border: 0;
    color: var(--alt-text-color);
    cursor: pointer;
    font-size: 0;
    padding: 10px;
    line-height: 1;
    margin-right: 8px;
    border-radius: 999px;
    transition: background 0.2s ease;
  }
  button:hover,
  button:focus-visible {
    background: color-mix(in srgb, currentColor 16%, transparent);
  }
  button:last-of-type{
    margin-right: 0;
  }
  @media(prefers-color-scheme: dark){
    button{
      color: var(--text-color);
    }
  }
</style>
