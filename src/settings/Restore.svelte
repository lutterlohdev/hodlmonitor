<script>
  import { portfolio } from "../portfolio/store";
  import { snackbar } from "../store";
  import { watchlist } from "../watchlist/store";
  let files;
  let fileInput;

  const updatePortfolio = (data) => {
    try {
      const json = JSON.parse(data);
      // Supporting the old backups. TODO: Remove this after next release
      if (Array.isArray(json)){
        portfolio.restoreFromFile(json);
      }
      json.portfolio
        ? portfolio.restoreFromFile(json.portfolio)
        : console.error("No portfolio backup");
      json.watchlist
        ? watchlist.restoreFromFile(json.watchlist)
        : console.error("No watchlist backup");
      snackbar.addMessage("Restored data successfully.");
    } catch (error) {
      snackbar.addMessage("Could not restore data.");
      console.error("An error occurred uploading the data", error);
    }
  };

  const upload = () => {
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = function (e) {
        updatePortfolio(e.target.result);
      };
      reader.readAsText(files[0]);
    }
  };

  const openFilePicker = () => fileInput?.click();
</script>

<form on:submit|preventDefault={upload}>
  <button type="button" on:click={openFilePicker}
    ><span class="material-icons">restore</span>Restore from Local Backup</button
  >
  <input
    required
    type="file"
    bind:this={fileInput}
    bind:files
    name="file"
    id="file"
    on:change={upload}
  />
</form>

<style>
  button {
    box-sizing: border-box;
    margin: 0 auto;
    display: block;
    background: var(--primary-color);
    color: var(--alt-text-color);
    cursor: pointer;
    padding: 1em;
    transition: 0.2s all;
    width: 100%;
    max-width: 400px;
    font-size: 18px;
    text-decoration: none;
    text-align: left;
    border: 0;
    font-family: inherit;
  }
  button:hover,
  button:focus {
    background: var(--alt-text-color);
    color: var(--primary-color);
  }
  button:active {
    transform: scale(0.95);
  }
  button > span {
    vertical-align: text-bottom;
    padding-right: 0.5em;
  }

  @media (prefers-color-scheme: dark) {
    button {
      background: var(--secondary-body-color);
      color: var(--text-color);
    }
    button:hover,
    button:focus {
      background: var(--text-color);
      color: var(--secondary-body-color);
    }
  }
  input[type="file"] {
    display: none;
  }
</style>
