<template>
  <div class="user-wrapper">
    <div class="user-profile">
      <div class="profile-current">
        <h1 class="profile-current-title">Безопасность аккаунта</h1>
        <div class="profile-current-box">
          <p class="profile-login-title">Пользователь</p>
          <p class="profile-login-name">{{ user.username }}</p>
        </div>
        <div class="profile-current-box">
          <p class="profile-login-title">Пароль</p>
          <p class="profile-login-password" @dblclick="getPass" v-if="pass"> {{ user.password }} </p>
          <p class="profile-login-password" @dblclick="getPass" v-else>*******</p>
        </div>
      </div>
      <div class="profile-current">
        <h1 class="profile-current-title">Права доступа</h1>
        <div class="profile-check-box">
          <div class="profile-check-value">
            <p class="profile-check-name">Пользователь 1</p>
            <p class="profile-check-email">{{ user.username }}</p>
          </div>
          <label class="profile-check-label" for="checkbox-1">
            <input type="checkbox" name="checkbox-1" checked id="1" />
          </label>
        </div>
      </div>
    </div>
    <div class="user-history">
      <div class="develop">
        <p class="develop-block">Этот блок в разработке!</p>
      </div>
      <p class="user-history-title">История активности</p>
      <table class="user-history-table">
        <thead class="user-history-head">
          <tr>
            <th scope="col-30">Имя</th>
            <th scope="col-30">Почта</th>
            <th scope="col-30">Дата</th>
            <th scope="col-40">Событие</th>
          </tr>
        </thead>
        <tbody class="user-history-head">
          <tr>
            <th scope="col-30" class="user-name">Пользователь 1</th>
            <th scope="col-30" class="user-email">neotech@gmail.com</th>
            <th scope="col-30" class="user-date">19/09/23</th>
            <th scope="col-40" class="user-action">
              Изменил главную страницу блок “наши решения”
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const pass = ref(false)
const user = ref({
  username: "",
  password: "",
  token: "",
})

const getPass = () => {
  pass.value = !pass.value
}

const fetchUser = async () => {
  user.value.username = await (await getStoreData("username")).toString()
  user.value.password = await (await getStoreData("password")).toString()
  user.value.token = await (await getStoreData("Authorization")).toString()
}

onMounted(async () => {
  fetchUser()
})

</script>

<style scoped lang="scss">
.profile {
  &-current {
    border: 1px solid #e5e5e5;
    border-radius: 0.4rem;
    margin-bottom: 3.2rem;

    &-title {
      padding: 2.4rem 2.4rem 1.6rem;
      border-bottom: 1px solid #e5e5e5;
      font-size: 2rem;
      line-height: 3rem;
    }

    &-box {
      padding: 1.6rem 2.4rem;
      display: flex;
      flex-direction: column;

      &:not(:last-of-type) {
        border-bottom: 1px solid #e5e5e5;
      }
    }
  }

  &-login {
    &-title {
      font-size: 1.6rem;
      line-height: 3rem;
      letter-spacing: 0.015rem;
      font-weight: 500;
    }

    &-name,
    &-password {
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 3rem;
      letter-spacing: 0.015rem;
    }

    &-password {
      letter-spacing: 0.15rem;
    }
  }

  &-check {
    &-box {
      display: flex;
      align-items: center;
      padding: 1.6rem 2.4rem;
      justify-content: space-between;
    }

    &-label {
      & input {
        width: 2rem;
        height: 2rem;
      }
    }

    &-value {
      display: flex;
      flex-direction: column;
    }

    &-name,
    &-email {
      font-size: 1.6rem;
      line-height: 3rem;
      letter-spacing: 0.015rem;
    }

    &-name {
      font-weight: 500;
    }

    &-email {
      font-size: 1.4rem;
      opacity: 0.5;
    }
  }
}

table {
  padding: 1.6rem 2.4rem;
  width: 100%;
  display: flex;
  flex-direction: column;

  & thead,
  tbody {
    display: flex;
    width: 100%;
    background: #f7f7f9;
    border-radius: 0.4rem;

    & tr {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding-left: 0.8rem;
    }

    & th {
      font-size: 1.4rem;
      line-height: 3rem;
      color: #6f727a;
      font-weight: 400;
      text-align: start;

      &[scope="col-30"] {
        width: 30%;
      }

      &[scope="col-40"] {
        width: 40%;
      }
    }
  }

  & tbody {
    background: unset;
    width: 100%;

    & tr {
      padding: 1.6rem 0;
      padding-left: 0.8rem;
      border-bottom: 0.1rem solid #e5e5e5;

      & th {
        color: #000 !important;
        line-height: 120%;
      }
    }
  }
}

.user {
  &-wrapper {
    display: flex;
    gap: 3.2rem;
  }

  &-profile {
    max-width: 35rem;
    width: 100%;
  }

  &-date {
    color: #6f727a;
  }

  &-history {
    border: 1px solid #e5e5e5;
    width: 100%;
    position: relative;

    &-title {
      padding: 2.4rem 2.4rem 1.6rem;
      font-size: 2rem;
      line-height: 3rem;
      font-weight: 500;
      letter-spacing: 0.15px;
      border-bottom: 1px solid #e5e5e5;
    }
  }
}

.develop {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(247, 247, 249, 0.5);
  backdrop-filter: blur(0.2rem);

  &-block {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    font-size: 4rem;
    line-height: 5rem;
  }
}
</style>
