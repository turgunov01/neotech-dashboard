<template>
    <div class="info">
        <div class="info-container">
            <div class="user-parameters">
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
                                <p class="security-data-info-content"> ******* </p>
                                <!-- <img src="/assets/edit.svg" alt="" @click="openpassword()"> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="user-history">
                <HistoryActivity />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Swal from 'sweetalert2';


const username = ref(false)
const password = ref(false)

const user = ref({
    username: localStorage.getItem("username"),
    password: localStorage.getItem("password"),
    new_username: "",
    new_password: ""
})

const getUser = async () => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("Authorization")}`
        },
        body: JSON.stringify({
            username: user.value.username,
            password: user.value.password
        })
    }

    await apiDataFetch(`${uri}/users/verify`, options)
        .then(response => response.json())
        .then(response => {

            if (response === false) {
                localStorage.removeItem("Authorization");
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

            user.value.username = response.user.username;
            user.value.password = response.user.password;
        })
}

</script>

<style scoped lang="scss"></style>