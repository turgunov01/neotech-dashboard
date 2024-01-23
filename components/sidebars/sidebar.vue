<template>
  <div class="sidebar">
    <div class="sidebar-container">
      <img src="../../src/assets/images/logo.svg" class="sidebar-logo" alt="" />
      <ul class="sidebar-list">
        <li class="sidebar-item">
          <nuxt-link to="/dashboard" class="sidebar-link">
            <img src="../../src/assets/images/sidebar-icons/chartpie.svg" class="inactive" alt="">
            <img src="../../src/assets/images/sidebar-icons/active/chartpie.svg" class="active" alt="">
            Дашбоард</nuxt-link>
        </li>
        <li class="sidebar-item">
          <nuxt-link to="/messages" class="sidebar-link">
            <img src="../../src/assets/images/sidebar-icons/chat.svg" class="inactive" alt="">
            <img src="../../src/assets/images/sidebar-icons/active/chat.svg" class="active" alt="">
            Сообщение</nuxt-link>
          <span class="sidebar-item sidebar-item-children">
            <nuxt-link class="sidebar-item" to="/messages/incoming/">
              Входящие
            </nuxt-link>
            <nuxt-link class="sidebar-item" to="/messages/outgoing/">
              Отправленные
            </nuxt-link>
            <nuxt-link class="sidebar-item" to="/messages/favourite/">
              Избранные
            </nuxt-link>
          </span>
        </li>
        <li class="sidebar-item">
          <nuxt-link to="/pages" class="sidebar-link">
            <img src="../../src/assets/images/sidebar-icons/document.svg" class="inactive" alt="">
            <img src="../../src/assets/images/sidebar-icons/active/document.svg" class="active" alt="">
            Страницы</nuxt-link>
        </li>
        <li class="sidebar-item">
          <nuxt-link to="/me" class="sidebar-link">
            <img src="../../src/assets/images/sidebar-icons/user.svg" class="inactive" alt="">
            <img src="../../src/assets/images/sidebar-icons/active/user.svg" class="active" alt="">
            Профиль</nuxt-link>
        </li>
      </ul>

      <button class="sidebar-button" @click="logout">Выйти</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Swal from 'sweetalert2';

const $router = useRouter();
const changeMessages = (e: any) => {
  const item = e.target;

  if (item) {
    useRouter().push({ path: "/messages/" + item.id });
  }

  setTimeout(() => {
    location.reload();
  }, 50);
};

const logout = () => {
  const store = localStorage.getItem("Authorization")

  Swal.fire({
    title: "Вы точно хотите выйти с системы?",
    showDenyButton: true,
    confirmButtonText: "Да",
    denyButtonText: `Отмена`
  }).then((result: any) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed && store) {
      localStorage.removeItem("Authorization")
      $router.push({ path: "/login" })
    } else {
      return
    }
  });




};
</script>

<style lang="scss" scoped>
.sidebar {
  width: 30rem;
  height: 100vh;

  &-logo {
    padding: 3.2rem 0.8rem;
  }

  &-container {
    max-width: 27rem;
    left: 0;
    width: 100%;
    position: fixed;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
    top: 0;
    background: white;
    height: 100vh;
  }

  &-list {
    display: flex;
    flex-direction: column;
    width: 100%;
    row-gap: 0.8rem;
    padding: 3.2rem 0.8rem;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
  }

  &-item {
    width: 100%;

    &-children {
      display: flex;
      flex-direction: column;
      row-gap: 0.8rem;
      margin: 0.8rem 0;

      & .sidebar {
        &-item {
          padding: 1.1rem 0;
          width: 100%;
          padding-left: 3rem;
          cursor: pointer;
          transition: 100ms;

          &:hover {
            color: #0054ff;
          }
        }
      }
    }
  }

  &-link {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1rem;
    border-radius: 0.4rem;
  }

  &-button {
    background: unset;
    border: none;
    outline: none;
    padding: 3.2rem 1.8rem;
    font-size: 1.6rem;
    line-height: 140%;
    cursor: pointer;
  }
}

a {
  color: #000;
  cursor: pointer;
}

a.active {
  background: #e3f2fd80;
  color: #0054ff;
}

.sidebar-link .active {
  display: none;
}

.sidebar-link.router-link-active .active {
  display: block;
}
.sidebar-link.router-link-active .inactive {
  display: none;
}



a.router-link-exact-active {
  background: #e3f2fd80;
  color: #0054ff;
}
</style>
