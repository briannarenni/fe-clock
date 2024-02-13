<script>
  import { onMount } from 'svelte';
  import { quoteStore } from '@scripts/stores.js';
  import { fetchQuote } from '@scripts/api-fetch.js';

  async function getQuote() {
    const response = await fetchQuote();
    // text, author
    quoteStore.set({ quote: response.text, author: response.author });
    console.log($quoteStore);
  }

  onMount(async () => {
    getQuote();
  });
</script>

<article>
  <div class="quote-wrap">
    <div class="quote">
      <!--
        {#if !$quoteStore.text}
               Loader
      {:else}
        <q>{$quoteStore.text} </q>
      {/if}
      -->
      <q>{$quoteStore.quote} </q>
      <br />
      <br />
      <p class="author">{$quoteStore.author}</p>
    </div>
    <button on:click={getQuote} class="refresh-btn">
      <img src="src/assets/icons/refresh-icon.svg" alt="Refresh quote" />
    </button>
  </div>
</article>

<style>
  .quote-wrap {
    display: flex;
    justify-content: space-evenly;
    line-height: 22px;
  }

  .quote {
    width: 90%;
  }

  .author {
    font-weight: bold;
  }

  .refresh-btn {
    align-self: flex-start;
    width: var(--icon-width);
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
</style>
