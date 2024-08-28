<template>
    <div class="security">
        <h1 class="security-title">Безопасность аккаунта</h1>
        <div class="security-datas">
            <div class="security-data">
                <p class="security-data-name">Пользователь 1</p>
                <div class="security-data-info">
                    <p class="security-data-info-content"> {{ user.username }} </p>
                </div>
            </div>
            <div class="security-data">
                <p class="security-data-name">Пароль</p>
                <div class="security-data-info">
                    <p class="security-data-info-content"> {{ user.password }} </p>
                    <img src="/assets/edit.svg" alt="" @click="openpassword()">
                </div>
            </div>
        </div>
    </div>

    <div class="username-handler" v-if="username" @click.self="openuser()">
        <div class="username-handler-container">
            <div class="username-data">
                <div class="username-handler-content">
                    <p class="username-handler-title">Логин</p>
                    <input v-model="user.username" type="text" placeholder="Введите логин">
                </div>
                <div class="username-handler-content">
                    <p class="username-handler-title">Новый логин</p>
                    <input v-model="user.new_username" type="text" placeholder="Введите новый логин">
                </div>
                <div class="username-handler-content">
                    <p class="username-handler-title">Пароль</p>
                    <input v-model="user.password" type="password" placeholder="Введите пароль">
                </div>
            </div>
            <button @click="changeData()" class="username-button">Сохранить</button>
        </div>
    </div>

    <div class="password-handler" v-if="password" @click.self="openpassword()">
        <div class="password-handler-container">
            <div class="password-data">
                <div class="password-handler-content">
                    <p class="password-handler-title">Логин</p>
                    <input v-model="user.username" type="text" placeholder="Введите логин">
                </div>
                <div class="password-handler-content">
                    <p class="password-handler-title">Пароль</p>
                    <input v-model="user.password" type="text" placeholder="Введите новый пароль">
                </div>
                <div class="password-handler-content">
                    <p class="password-handler-title">Новый пароль</p>
                    <input v-model="user.new_password" type="password" placeholder="Введите новый пароль">
                </div>
            </div>
            <button @click="changePassword()" class="password-button">Сохранить</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Swal from 'sweetalert2';


const username = ref(false)
const password = ref(false)

const user = ref({
    username: "",
    password: "",
    new_username: "",
    new_password: ""
})

const getUser = async () => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("Authorization")}`
        }
    }

    await apiDataFetch(`${uri}/users/verify`, options)
        .then(response => response.json())
        .then(response => {

            if (response === false) {
                sessionStorage.removeItem("Authorization");
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });

                Toast.fire({
                    icon: "error",
                    title: "Verification Failed"
                });

                setTimeout(() => {
                    location.reload();
                }, 3000);
            }

            user.value.username = response.username;
            user.value.password = response.password;
        })
}

const changeData = async () => {
    const options = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("Authorization")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: user.value.username,
            password: user.value.password,
            new_username: user.value.new_username,
        })
    }

    await apiDataFetch(`${uri}/users/change/username`, options)
        .then(response => response.json())
        .then(response => {
            const data = response;

            if (data.token) {
                sessionStorage.removeItem("Authorization");
                sessionStorage.setItem("Authorization", data.token);

                setTimeout(() => {
                    location.reload();
                }, 500);
            }
        })
}

const changePassword = async () => {
    const options = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("Authorization")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: user.value.username,
            old_password: user.value.password,
            new_password: user.value.new_password,
        })
    }

    await apiDataFetch(`${uri}/users/change/password`, options)
        .then(response => response.json())
        .then(response => {
            const data = response;

            if (data.token) {
                sessionStorage.removeItem("Authorization");
                sessionStorage.setItem("Authorization", data.token);

                setTimeout(() => {
                    location.reload();
                }, 500);
            }
        })
}

const openuser = () => {
    username.value = !username.value;
}

const openpassword = () => {
    password.value = !password.value;
}

onMounted(() => {
    getUser()
})
</script>

<style scoped lang="scss">
.username {
    &-handler {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(149, 149, 149, 0.1);
        backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;

        &-container {
            width: 50rem;
            height: 40rem;
            background: rgba(255, 255, 255);
            padding: 3rem 2rem;
            color: black;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border-radius: 5px;


            & input {
                background: white !important;
                border-bottom: 1px solid rgba(0, 0, 0);
                padding: 1rem .5rem;
                width: 100%;
                outline: none;
            }
        }

    }

    &-data {
        display: flex;
        flex-direction: column;
        row-gap: 30px;
    }

    &-button {
        background: #3F51B5;
        color: white;
        border: none;
        padding: 1rem 2rem;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
}

.password {
    &-handler {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(149, 149, 149, 0.1);
        backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;

        &-container {
            width: 50rem;
            height: 40rem;
            background: rgba(255, 255, 255);
            padding: 3rem 2rem;
            color: black;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border-radius: 5px;


            & input {
                background: white !important;
                border-bottom: 1px solid rgba(0, 0, 0);
                padding: 1rem .5rem;
                width: 100%;
                outline: none;
            }
        }

    }

    &-data {
        display: flex;
        flex-direction: column;
        row-gap: 30px;
    }

    &-button {
        background: #3F51B5;
        color: white;
        border: none;
        padding: 1rem 2rem;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
}
</style>