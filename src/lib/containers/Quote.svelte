<script>
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import { SkeletonBlock, SkeletonText } from 'skeleton-elements/svelte';
  import { updateQuote, quoteStore } from '@js/api-stores.js';

  export let isInfoPanelOpen;

  onMount(async () => updateQuote());
</script>

{#if !isInfoPanelOpen}
  <div class="quote-wrap" transition:slide={{ duration: 650, delay: 0 }}>
    <div class="quote">
      {#if !$quoteStore.quote}
        <SkeletonBlock width="100%" height="4rem" effect="wave" />
      {:else}
        <q>{$quoteStore.quote} </q>
      {/if}
      <br />
      <br />
      {#if !$quoteStore.author}
        <SkeletonText effect="wave">Lorem ipsum</SkeletonText>
      {:else}
        <p class="author">{$quoteStore.author}</p>
      {/if}
    </div>

    <button on:click={updateQuote} class="refresh-btn">
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
