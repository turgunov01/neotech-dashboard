<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    const router = useRouter();

    router.push({ path: "/dashboard" });
  },
};
</script>

<style lang="scss" scoped></style>
