<script setup lang="ts">
import { format, isSameDay, sub, type Duration } from 'date-fns'
import { DatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';
import calendar from '@/assets/calendar.svg?raw'

const selected = ref({ start: new Date(), end: sub(new Date(), { days: 14 }) })
const days = document.querySelectorAll(".vc-day");

const date = () => {
    console.log(days)
}

onMounted(() => {
})

</script>

<template>
    <UPopover :popper="{ placement: 'bottom-start' }">
        <UButton icon="i-heroicons-calendar-days-20-solid" v-html="calendar" @click="date" />

        <template #panel="{ close }">
            <div class="flex items-center">
                <DatePicker ref="days" :model-value="selected" :max-date="selected.start" :update-on-input="true"
                    @close="close" />
            </div>
        </template>
    </UPopover>
</template>


<style scoped>
.dark\:text-gray-900:is(.dark *) {
    background: white !important;
    width: 100% !important;
    height: 4rem !important;
    display: flex;
    align-items: center;
    justify-content: center;
    border: .1rem solid #E5E5E5
}
</style>