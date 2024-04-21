<!-- ! Unused component -->
<script>
  import Select from 'svelte-select';
  import { bkgPrefStore } from '@js/theme.js';

  const items = [
    { value: 'scenic', label: 'Scenic (Default)' },
    { value: 'glacier', label: 'Glacier' },
    { value: 'meadow', label: 'Meadow' },
    { value: 'grape', label: 'Grape Jelly' },
    { value: 'bubblegum', label: 'Bubblegum' },
    { value: 'tropical', label: 'Tropical' },
    { value: 'lilac', label: 'Lilac Field' },
    { value: 'gunmetal', label: 'Gunmetal (Light)' },
    { value: 'midnight', label: 'Midnight (Dark)' }
  ];

  const handleSelection = (e) => {
    bkgPrefStore.set(e.detail.value);
  };
</script>

<div class="bkg-setting">
  <p class="menu-label">Change Background</p>
  <Select {items} value={$bkgPrefStore} on:change={handleSelection} showChevron clearable={false} searchable={false} />
</div>

<style>
  .bkg-setting {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-block-start: 1rem;
  }
  .menu-label {
    font-size: 1.2rem;
    line-height: 40px;
  }
</style>
