<template>
  <div class="stats-block">
    <div class="stats-block-header">
      <h4 class="stats-block-name">{{ item.name }}</h4>
      <ul class="stats-block-buttons">
        <li class="stats-block-button">
          <button class="stats-block-date">За день</button>
        </li>
        <li class="stats-block-button">
          <button class="stats-block-date">За месяц</button>
        </li>
        <li class="stats-block-button">
          <button class="stats-block-date">За год</button>
        </li>
      </ul>
    </div>
    <div class="stats-block-body">
      <h2 class="stats-block-count">{{ item.count }}</h2>
      <p class="stats-block-type">{{ item.type }}</p>
    </div>
    <div class="stats-linear" v-if="develop">
      <p class="stats-linear-title">Блок в разработке</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      required: true,
      type: Object,
    },
    develop: {
      required: true,
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
.stats {
  &-block {
    width: 100%;
    padding: 2rem;
    background: white;
    border: 1px solid #e5e5e5;
    border-radius: 0.4rem;
    min-height: 18rem;
    position: relative;

    &-name {
      font-size: 1.6rem;
      line-height: 125%;
      font-weight: 500;
    }

    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &-buttons {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &-button {
      font-size: 1.5rem;
      border: 1px solid #e5e5e5;
      background: unset;
      width: 100%;

      & button {
        background: unset;
        border: none;
        padding: 0.8rem 1.6rem;
        width: max-content;
      }

      &:nth-of-type(2) {
        border-left-width: 0.05rem;
        border-right-width: 0.05rem;
      }
    }

    &-body {
      display: flex;
      align-items: flex-end;
      margin-top: 2.4rem;
    }

    &-count {
      font-size: 5.2rem;
      line-height: 120%;
      font-weight: 500;
    }

    &-type {
      font-size: 1.2rem;
      line-height: 120%;
      padding-bottom: 1rem;
      font-weight: 400;
      opacity: 0.5;
    }
  }

  &-linear {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    height: 100%;
    background: #ffffff80;
    backdrop-filter: blur(.8rem);

    &-title {
      width: 100%;
      height: 100%;
      font-size: 3rem;
      line-height: 4rem;
      font-weight: 400;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
