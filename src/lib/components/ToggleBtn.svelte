<script>
  import { format12HrStore, getUserTime, clockStore } from '@scripts/stores.js';

  const toggleFormat = () => {
    format12HrStore.update((value) => !value);

    if ($format12HrStore) {
      clockStore.update((value) => getUserTime(value));
    } else {
      clockStore.update((clock) => ({ ...clock, currentPeriod: '' }));
    }
  };
</script>

<div class="toggle-wrap">
  <span class="btn-text">24 hr</span>
  <button class="toggle-btn" on:click={() => toggleFormat()}>
    <input
      type="checkbox"
      class="checkbox"
      bind:checked={$format12HrStore}
      value={$format12HrStore}
      name="toggle" />
    <span class="slider"></span>
  </button>
  <span class="btn-text">12 hr</span>
</div>

<style>
  .toggle-wrap {
    display: flex;
    justify-content: flex-end;
    padding-inline: var(--gap-md);
    margin-block-start: var(--gap-sm);
  }

  .btn-text {
    font-size: var(--location-font);
    font-weight: bold;
    color: white;
    line-height: 40px;
    margin-inline: 10px;
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
