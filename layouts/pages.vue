<template>
  <div class="wrapper">
    <!-- <SpaLoadingTemplate v-if="1" /> -->
    <div class="sidebar">
      <div class="sidebar-container">
        <img src="../src/assets/images/logo.svg" class="sidebar-logo" alt="" />
        <ul class="sidebar-list">
          <li class="sidebar-item">
            <nuxt-link to="/dashboard" class="sidebar-link">
              <img src="../src/assets/images/sidebar-icons/chartpie.svg" class="inactive" alt="">
              <img src="../src/assets/images/sidebar-icons/active/chartpie.svg" class="active" alt="">
              Дашбоард</nuxt-link>
          </li>
          <li class="sidebar-item messages">
            <nuxt-link to="/messages" class="sidebar-link"
              :class="$router.currentRoute.value.path.includes('messages') ? 'router-link-exact-active' : ''">
              <img src="../src/assets/images/sidebar-icons/chat.svg" class="inactive" alt="">
              <img src="../src/assets/images/sidebar-icons/active/chat.svg" class="active" alt="">
              Сообщение</nuxt-link>
          </li>
          <li class="sidebar-item">
            <nuxt-link to="/pages" class="sidebar-link active">
              <img src="../src/assets/images/sidebar-icons/document.svg" class="inactive" alt="">
              <img src="../src/assets/images/sidebar-icons/active/document.svg" class="active" alt="">
              Страницы</nuxt-link>
          </li>
          <li class="sidebar-item">
            <nuxt-link to="/me" class="sidebar-link">
              <img src="../src/assets/images/sidebar-icons/user.svg" class="inactive" alt="">
              <img src="../src/assets/images/sidebar-icons/active/user.svg" class="active" alt="">
              Профиль</nuxt-link>
          </li>
        </ul>
        <button class="sidebar-button" @click="logout">
          <img src="../src/assets/images/sidebar-icons/lougout.svg" class="active" alt="">
          <p class="sidebar-button-text">Выйти</p>
        </button>
      </div>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import sidebar from '~/components/sidebars/sidebar.vue';
const $router = useRouter()



</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  height: 8rem;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 .4rem 1rem rgba(0, 0, 0, 0.1);

  &-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    width: 100%;
    height: 8rem;
  }

  &-list {
    display: flex;
    align-items: center;
    gap: 3rem;
  }

  &-item {
    &.messages {
      display: flex;
      flex-direction: column;

      & span {
        display: flex;
        flex-direction: column;
      }
    }
  }

  &-link {
    width: 100%;
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .8rem;

    &.active {
      color: #0054FF;

      & .active {
        display: block;
      }

      & .inactive {
        display: none;
      }
    }

    & .active {
      display: none;
    }

    &:hover {
      color: #0054FF;

      & .active {
        display: block;
      }

      & .inactive {
        display: none;
      }
    }
  }

  &-button {
    background: unset;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row-reverse;
    gap: 1rem;

    & img {
      width: 2rem;
      height: 2rem;
    }

    &-text {
      font-size: 1.6rem;
    }
  }
}

.container {
  max-width: 132rem !important;
}

.content {
  margin-top: 8rem;
}

</style>
