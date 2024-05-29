<template>
    <div class="sidebar-conf">
        <div class="sidebar-params">
            <h2 class="sidebar-params-title"> {{ data.title }} </h2>
        </div>
        <ul class="sidebar-list">
            <li class="sidebar-item" v-if="!outgoing"
                :class="$router.currentRoute.value.params.id == item.id ? 'active' : ''"
                :data-type="`${data.type}-messages`" v-for="item in data.messages ">
                <nuxt-link :to="`${item.id}`">
                    <h4 class="sidebar-item-message"> {{ item.messages }} </h4>
                    <h6 class="sidebar-item-author"> {{ item.email }} </h6>
                    <p class="sidebar-item-date"> {{ item.date.replace(/\./g, '/') }} </p>
                </nuxt-link>
            </li>
            <li class="sidebar-item" v-else-if="outgoing"
                :class="$router.currentRoute.value.params.id == item.id ? 'active' : ''"
                :data-type="`${data.type}-messages`" v-for="item in data.messages ">
                <nuxt-link :to="`${item.id}`">
                    <h4 class="sidebar-item-message"> {{ item.messages }} </h4>
                    <h6 class="sidebar-item-author"> {{ item.email }} </h6>
                    <p class="sidebar-item-date"> {{ item.date.replace(/\./g, '/') }} </p>
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>


<script lang="ts" setup>
import { defineProps } from 'vue'

const $router = useRouter()

const outgoing = $router.currentRoute.value.path.includes("outgoing")


const props = defineProps({
    data: {
        required: true,
        type: Object,
    }
});


</script>

<style scoped lang="scss"></style>