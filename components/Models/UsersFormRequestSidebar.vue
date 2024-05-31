<template>
    <div class="sidebar-conf">
        <div class="sidebar-params">
            <h2 class="sidebar-params-title"> {{ data.title }} </h2>
        </div>
        <ul class="sidebar-list">
            <li class="sidebar-item" :class="$router.currentRoute.value.params.id == item.id ? 'active' : ''"
                :data-type="`${data.type}-messages`" v-for="item in data.messages">
                <nuxt-link :to="`${item.id}`" v-if="item.type === 1">
                    <h4 class="sidebar-item-message"> {{ item.messages }} </h4>
                    <h6 class="sidebar-item-author"> {{ item.email }} </h6>
                    <p class="sidebar-item-date"> {{ item.date.replace(/\./g, '/') }} </p>
                </nuxt-link>
                <nuxt-link :to="`/mail/outgoing/${item.id}`" v-else-if="item.type !== 1">
                    <h4 class="sidebar-item-message"> {{ item.messages }} </h4>
                    <h6 class="sidebar-item-author"> {{ item.email }} </h6>
                    <p class="sidebar-item-date"> {{ item.date.replace(/\./g, '/') }} </p>
                </nuxt-link>
                <img src="../../assets/star-in.svg" class="sidebar-item-star" :class="item.isFav == 'true' ? 'active' : ''" alt="">
            </li>
        </ul>
    </div>
</template>


<script lang="ts" setup>
import { defineProps } from 'vue'

const $router = useRouter()


const props = defineProps({
    data: {
        required: true,
        type: Object,
    }
});


</script>

<style scoped lang="scss"></style>