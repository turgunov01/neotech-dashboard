<template>
  <div class="pages">
    <ul class="pages-settings">
      <li class="pages-settings-item">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="14px">
          <path
            d="M28 14c0-7.7-6.3-14-14-14S0 6.3 0 14c0 7.5 5.9 13.7 13.5 14h1C22 27.7 28 21.5 28 14zM14 25.9c-1.4-1.3-2.4-3-2.9-4.9H17c-.6 1.8-1.6 3.5-3 4.9zM10.5 19c-.3-1.3-.4-2.7-.5-4h7.9c0 1.3-.2 2.7-.5 4h-6.9zm-8.4-4h6c0 1.3.2 2.7.4 4H3.1c-.5-1.3-.9-2.6-1-4zM14 2.3c1.4 1.3 2.4 2.9 2.9 4.7h-5.8c.5-1.8 1.5-3.4 2.9-4.7zM17.5 9c.3 1.3.4 2.7.5 4h-7.9c0-1.3.2-2.7.5-4h6.9zm8.4 4h-6c0-1.3-.2-2.7-.4-4h5.4c.5 1.3.9 2.6 1 4zM8.1 13h-6c.1-1.4.5-2.7 1.1-4h5.3c-.3 1.3-.4 2.7-.4 4zm11.8 2h6c-.1 1.4-.5 2.7-1.1 4h-5.3c.3-1.3.4-2.7.4-4zm3.8-8H19c-.5-1.7-1.2-3.2-2.2-4.6C19.6 3 22 4.7 23.7 7zM11.2 2.4c-1 1.4-1.7 3-2.2 4.6H4.3C6 4.7 8.4 3 11.2 2.4zM4.3 21H9c.5 1.6 1.2 3.2 2.2 4.6-2.8-.7-5.2-2.3-6.9-4.6zm12.6 4.6c1-1.4 1.7-3 2.1-4.6h4.7c-1.7 2.3-4.1 3.9-6.8 4.6z">
          </path>
        </svg>
        <p class="pages-setting-name">
          <a href="https://s-landing.ihoops.uz" class="pages-settings-link"
            target="_blank">https://s-landing.ihoops.uz</a>
        </p>
      </li>
    </ul>
    <div class="pages-text">
      <p class="pages-text-name"></p>
      <div class="pages-buttons">
        <button class="pages-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="14px" height="14px">
            <path
              d="M25.72 15.27l1.33-1a2.47 2.47 0 00-.75-4.29l-1.6-.51a1.72 1.72 0 01-1.15-2l.37-1.66A2.43 2.43 0 0020.62 3l-1.55.65a1.68 1.68 0 01-2.15-.79l-.77-1.51a2.41 2.41 0 00-4.3 0l-.77 1.51a1.68 1.68 0 01-2.15.79L7.38 3a2.43 2.43 0 00-3.3 2.8l.37 1.66a1.72 1.72 0 01-1.15 2l-1.6.51a2.47 2.47 0 00-.7 4.27l1.33 1a1.73 1.73 0 01.4 2.29L1.78 19a2.45 2.45 0 002.15 3.77l1.67-.08a1.7 1.7 0 011.76 1.49l.22 1.68a2.42 2.42 0 004 1.49l1.23-1.15a1.68 1.68 0 012.29 0l1.23 1.15a2.42 2.42 0 004-1.49l.22-1.68a1.7 1.7 0 011.76-1.49l1.67.08A2.45 2.45 0 0026.22 19l-.9-1.43a1.73 1.73 0 01.4-2.3zM14 20.77A6.77 6.77 0 1120.77 14 6.77 6.77 0 0114 20.77z"
              fill="#365BA7"></path>
          </svg>
          Настройки сайта
        </button>
        <button class="pages-button blocker" @click="$router.push({ path: '/pages/create/' })">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="14px" height="14px">
            <path fill="#fff" d="M25.79 12H16V2.21h-4V12H2.21v4H12v9.79h4V16h9.79z"></path>
          </svg>
          Создание новой страницы
        </button>
      </div>
    </div>
    <ul class="pages-listing">
      <li class="pages-list-card">
        <PagesList />
      </li>
    </ul>
    <div class="pages-container">
    </div>
  </div>
</template>


<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const meta = definePageMeta({
  layout: "pages"
})

</script>

<style scoped lang="scss">
.pages {
  max-width: 1320px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;

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

  &-settings {
    &-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 0 4rem 0;
    }

    &-link {
      color: rgba(0, 0, 0, 0.5);

      &:hover {
        color: #000;
      }
    }
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

  &-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  &-button {
    background: #f5f5f5;
    padding: 0 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    font-size: 1.8rem;
    background: #ffffff;
    border: unset;
    border-radius: 5rem;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.01);
    transition: 300ms;
    cursor: pointer;
    height: 6rem;

    &.blocker {
      background: #365BA7;
      color: #ffffff;

      &:hover {
        box-shadow: 0 0 1rem #365BA7;
      }
    }

    &:hover {
      box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
    }
  }

  &-text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 0;

    &-name {
      font-size: 6.4rem;
      font-weight: 300;
    }
  }
}
</style>
