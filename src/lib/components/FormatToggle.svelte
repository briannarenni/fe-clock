<script>
  import { fade } from 'svelte/transition';
  import { formatBoolStore, getUserTime, clockStore } from '@js/data-stores.js';

  const toggleFormat = () => {
    formatBoolStore.update((value) => !value);
    formatBoolStore.subscribe((value) => {
      clockStore.set(getUserTime(value));
    });
  };
</script>

<div class="format-setting">
  <p class="menu-label">12-Hour Format</p>
  <div class="toggle-wrap">
    <span class="btn-text">Off</span>
    <button class="toggle-btn" on:click={() => toggleFormat()}>
      <input
        type="checkbox"
        class="checkbox"
        bind:checked={$formatBoolStore}
        value={$formatBoolStore}
        name="toggle" />
      <span class="slider"></span>
    </button>
    <span class="btn-text">On</span>
  </div>
</div>

<style>
  .format-setting {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    margin-block-start: 1rem;
  }

  .menu-label {
    font-size: 1.2rem;
    line-height: 40px;
  }

  .toggle-wrap {
    display: flex;
    justify-content: space-between;
    max-width: 60%;
  }

  .btn-text {
    font-size: 1.1rem;
    line-height: 40px;
    font-weight: 300;
  }

  .toggle-btn {
    position: relative;
    display: inline-block;
    width: 70px;
    height: 40px;
    border-radius: 25px;
    padding: 0 10px;
    overflow: hidden;
    cursor: pointer;
    transform: scale(0.8);
  }

  .checkbox {
    display: none;
  }

  .slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    border-radius: 25px;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 30px;
    width: 30px;
    left: 5px;
    bottom: 5px;
    background-color: white;
    border-radius: 50%;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:checked + .slider:before {
    transform: translateX(100%);
  }
</style>
