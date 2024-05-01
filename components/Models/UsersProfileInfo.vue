<template>
    <div class="security">
        <h1 class="security-title">Безопасность аккаунта</h1>
        <div class="security-datas">
            <div class="security-data">
                <p class="security-data-name">Пользователь 1</p>
                <div class="security-data-info">
                    <p class="security-data-info-content"> {{ user.email }} </p>
                    <img src="/assets/edit.svg" alt="">
                </div>
            </div>
            <div class="security-data">
                <p class="security-data-name">Пароль</p>
                <div class="security-data-info">
                    <p class="security-data-info-content"> {{ user.password }} </p>
                    <img src="/assets/edit.svg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    user: {
        required: true,
        type: Object,
        default: {
            email: 'sardorceeksamurai@gmail.com',
            phone: '+7 999 999 99 99',
            password: '*********'
        }
    }
})
</script>

<style scoped lang="scss"></style>