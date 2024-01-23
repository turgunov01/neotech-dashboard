<template>
  <div class="pages">
    <div class="pages-header">
      <p class="pages-header-title">Главная страница</p>
      <ul class="pages-list">
        <li class="pages-item">
          <button class="pages-item-button">Русский</button>
        </li>
        <li class="pages-item">
          <button class="pages-item-button">Английский</button>
        </li>
        <li class="pages-item">
          <button class="pages-item-button">Узбекский</button>
        </li>
      </ul>
    </div>
    <div class="pages-container">
    </div>
  </div>
</template>


<script setup lang="ts">
import layerEditor from "~/components/layerEditor.vue";
import blocksList from "~/components/sidebars/blocks.list.vue";
const router = useRouter();
const route = useRoute();
</script>

<style scoped lang="scss">
.pages {
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2.4rem;
    background: white;

    &-title {
      font-size: 2rem;
      color: #000;
      font-weight: 500;
      line-height: 130%;
    }
  }

  &-list {
    display: flex;
    align-items: center;
  }

  &-item {
    width: max-content;
    background: white;

    & button {
      background: unset;
      padding: 1.1rem 2.4rem;
      border: none;
      outline: none;
      cursor: pointer;
      border: 1px solid #e5e5e5;

      &:nth-of-type(2) {
        border-left-width: 0.5rem;
        border-right-width: 0.5rem;
      }

      &.active {
        color: #0054ff;
        background: #f1f9fe;
      }
    }
  }

  &-container {
    margin-top: 3.2rem;
    display: flex;
    align-items: flex-start;
    gap: 3.2rem;
  }

  &-sidebar {
    min-width: 25rem;
  }

  &-template {
    width: 100%;
    background: white;
    border-radius: 0.4rem;
    padding: 0.8rem;
  }
}

</style>
