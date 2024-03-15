<script>
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import { SkeletonBlock, SkeletonText } from 'skeleton-elements/svelte';
  import { quoteApiStore } from '@scripts/stores.js';
  import { fetchQuote } from '@scripts/apiServices.js';

  export let isExpandOpen;

  $: quote = $quoteApiStore.quote;
  $: author = $quoteApiStore.author;

  const getQuote = async () => {
    const response = await fetchQuote();
    quoteApiStore.set({ quote: response.text, author: response.author });
  };

  onMount(async () => {
    getQuote();
  });
</script>

{#if !isExpandOpen}
  <div class="quote-wrap" transition:slide={{ duration: 650, delay: 0 }}>
    <div class="quote">
      {#if !quote}
        <SkeletonBlock width="100%" height="4rem" effect="wave" />
      {:else}
        <q>{quote} </q>
      {/if}
      <br />
      <br />
      {#if !author}
        <SkeletonText effect="wave">Lorem ipsum</SkeletonText>
      {:else}
        <p class="author">{author}</p>
      {/if}
    </div>

    <button on:click={getQuote} class="refresh-btn">
      <img src="assets/icons/refresh-icon.svg" alt="Refresh quote" />
    </button>
  </div>
{:else}
  <div class="grid-div"></div>
{/if}

<style>
  .quote-wrap {
    display: flex;
    justify-content: space-evenly;
    line-height: 1rem;
    padding-block-start: var(--gap-md);
    padding-inline-start: var(--gap-md);
    padding-inline-end: var(--gap-sm);
  }

  .quote {
    width: 90%;
    font-size: var(--quote-font);
  }

  .author {
    font-weight: bold;
  }

  .refresh-btn {
    color: #ffffff;
    align-self: flex-start;
    width: var(--icon-width);
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .grid-div {
    min-height: 1px;
    max-height: 10px;
  }

  /* Todo: Container? */
  @media (min-width: 600px) {
    .quote-wrap {
      max-width: 95%;
    }
  }

  @media (min-width: 1024px) {
    .quote-wrap {
      max-width: 80vw;
    }
  }
</style>
