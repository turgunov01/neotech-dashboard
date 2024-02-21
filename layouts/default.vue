<template>
  <div class="wrapper">
    <!-- <SpaLoadingTemplate v-if="1" /> -->
    <Ucontainer>
      <div class="container">
        <sidebar />
        <div class="content">
          <slot />
        </div>
      </div>
    </Ucontainer>
    <UNotifications />
  </div>
</template>

<script lang="ts" setup>
import sidebar from '~/components/sidebars/sidebar.vue';
const $router = useRouter()

</script>

<style lang="scss" scoped>
.container {
  max-width: 100% !important;
  width: 100%;
  margin: 0 auto;
}

.wrapper {
  & .container {
    display: flex;
  }

  & .content {
    padding: 3.2rem;
    width: 100%;
  }
}
</style>