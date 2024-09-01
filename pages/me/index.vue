<template>
    <div class="info">
        <div class="info-container">
            <div class="user-parameters">
                <UsersInfo />
            </div>
            <div class="user-history">
                <HistoryActivity />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import HistoryActivity from '~/components/User/UserHistoryActivity.vue';
import UsersInfo from '~/components/Models/UsersProfileInfo.vue';


</script>

<style scoped lang="scss"></style>