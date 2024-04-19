<script>
  import { bkgPrefStore } from '@js/theming.js';
</script>

<div class="bkg-setting">
  <p class="menu-label">Change Background</p>
  <select bind:value={$bkgPrefStore} name="bkg-menu" class="bkg-options" id="bkg-settingor">
    <option value="scenic">Scenic (Default)</option>
    <option value="dark">Dark</option>
    <option value="light">Light</option>
  </select>
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

  .bkg-options {
    min-width: 100%;
    min-height: 2rem;
    background-color: var(--white);
    color: var(--black);
    font-weight: 300;
    font-size: 1rem;
    border: 1.5px solid var(--stone);
    border-radius: 20px;
    padding-block: 3px;
    padding-inline: 10px;
  }
</style>
