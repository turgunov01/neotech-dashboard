<template>
  <div class="login login-box">
    <div class="login-logo">
      <img src="../src/assets/images/logo.svg" class="login-logo-item" alt="" />
    </div>
    <div class="login-modal">
      <label for="login">
        <p class="login-modal-title">Логин</p>
        <input type="text" v-model="user.username" id="login" placeholder="Введите логин" />
      </label>
      <label for="password">
        <p class="login-modal-title">Пароль</p>
        <input type="text" id="password" v-model="user.password" placeholder="Введите пароль" />
      </label>
      <button class="login-button" @click="login">Вход</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const $router = useRouter()
const meta = definePageMeta({
  layout: "auth",
});

const user = ref({
  username: "",
  password: ""
})

function getUserData() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }

  fetch("https://ipinfo.io?token=ce894f2adc1c34", options)
    .then((response: Response) => response.json())
    .then(response => {
      console.log(response)
    })
}

const login = async () => {
  await postUserData('/api/login', user.value)
}


</script>

<style lang="scss" scoped>
.login {
  &-logo {
    margin-bottom: 1.5rem;
  }

  &-box {
    width: 100%;
    max-width: 44rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  &-modal {
    border: 0.1rem solid #e5e5e5;
    width: 100%;
    padding: 2.4rem;
    border-radius: 0.4rem;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    row-gap: 2.4rem;

    &-title {
      color: #000;
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 3rem;
      letter-spacing: 0.015rem;
    }

    & label {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    & input {
      width: 100%;
      padding: 0.7rem 1.6rem;
      border: 0.1rem solid #e5e5e5;
      border-radius: 0.4rem;
      outline: none;
    }
  }

  &-button {
    background: #e2f0fd;
    color: #0054ff;
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.8rem;
    letter-spacing: 0.01rem;
    text-align: center;
    border: none;
    border-radius: .4rem;
    width: 100%;
    padding: 1.1rem 0;
    margin-top: 1rem;
  }
}
</style>
