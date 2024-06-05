<template>
    <div class="login">
        <div class="login-box">
            <div class="login-logo">
                <img src="../src/assets/images/logo.svg" class="login-logo-item" alt="" />
            </div>
            <div class="login-modal">
                <label for="login">
                    <p class="login-modal-title">Логин</p>
                    <input type="email" v-model="user.username" id="login" placeholder="Введите логин" />
                </label>
                <label for="password">
                    <p class="login-modal-title">Пароль</p>
                    <input type="text" id="password" v-model="user.password" placeholder="Введите пароль" />
                </label>
                <button class="login-button" @click="login">Вход</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { apiDataFetch, storeData, uri, getStoreData } from '../../composables/exports'

const $router = useRouter()

const user = ref({
    username: "",
    password: ""
})

const login = async () => {
    if (user.value.username !== "" && user.value.password !== "") {

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user.value)
        };

        await apiDataFetch(uri + "/api/valid/token", {
            ...options
        })
            .then(response => response.json())
            .then(response => {
                try {
                    storeData("Authorization", response.user.token)
                    storeData("username", response.user.username)
                    storeData("password", response.user.password)

                    const avail = {
                        username: getStoreData("username"),
                        password: getStoreData("password"),
                        token: getStoreData("Authorization")
                    }

                    if (avail.username && avail.password && avail.token) {
                        $router.push("/")

                        setTimeout(() => {
                            location.reload()
                        }, 200);
                    }
                } catch (err) {
                    console.log(err)
                }
            })
    } else {
        alert("Заполните все поля")
    }
}


</script>

<style lang="scss" scoped>
.login {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);

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
            background: unset !important;
            border-radius: 0.4rem;
            outline: none;
            color: #000 !important;
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