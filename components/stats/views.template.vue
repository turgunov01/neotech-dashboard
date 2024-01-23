vbas
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
    <div class="stats-body">
      <div class="stats-body-types">
        <p class="stats-body-type">Страницы</p>
        <p class="stats-body-type">Просмотры</p>
      </div>
      <div class="stats-body-list">
        <div class="stats-body-item">
          <div class="stats-body-item-name">
            <img
              src="../../src/assets/images/logo-square.svg"
              class="stats-body-item-icon"
              alt=""
            />
            <p class="stats-body-item-route">Главная</p>
          </div>
          <p class="stats-body-item-count">233</p>
        </div>
        <div class="stats-body-item">
          <div class="stats-body-item-name">
            <img
              src="../../src/assets/images/logo-square.svg"
              class="stats-body-item-icon"
              alt=""
            />
            <p class="stats-body-item-route">Наши решения</p>
          </div>
          <p class="stats-body-item-count">123</p>
        </div>
        <div class="stats-body-item">
          <div class="stats-body-item-name">
            <img
              src="../../src/assets/images/logo-square.svg"
              class="stats-body-item-icon"
              alt=""
            />
            <p class="stats-body-item-route">Мы создаем</p>
          </div>
          <p class="stats-body-item-count">45</p>
        </div>
        <div class="stats-body-item">
          <div class="stats-body-item-name">
            <img
              src="../../src/assets/images/logo-square.svg"
              class="stats-body-item-icon"
              alt=""
            />
            <p class="stats-body-item-route">Нам доверяют</p>
          </div>
          <p class="stats-body-item-count">45</p>
        </div>
        <div class="stats-body-item">
          <div class="stats-body-item-name">
            <img
              src="../../src/assets/images/logo-square.svg"
              class="stats-body-item-icon"
              alt=""
            />
            <p class="stats-body-item-route">Главная</p>
          </div>
          <p class="stats-body-item-count">233</p>
        </div>
        <div class="stats-body-item">
          <div class="stats-body-item-name">
            <img
              src="../../src/assets/images/logo-square.svg"
              class="stats-body-item-icon"
              alt=""
            />
            <p class="stats-body-item-route">Наши решения</p>
          </div>
          <p class="stats-body-item-count">123</p>
        </div>
        <div class="stats-body-item">
          <div class="stats-body-item-name">
            <img
              src="../../src/assets/images/logo-square.svg"
              class="stats-body-item-icon"
              alt=""
            />
            <p class="stats-body-item-route">Мы создаем</p>
          </div>
          <p class="stats-body-item-count">45</p>
        </div>
        <div class="stats-body-item">
          <div class="stats-body-item-name">
            <img
              src="../../src/assets/images/logo-square.svg"
              class="stats-body-item-icon"
              alt=""
            />
            <p class="stats-body-item-route">Нам доверяют</p>
          </div>
          <p class="stats-body-item-count">45</p>
        </div>
      </div>
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
      border-bottom: 1px solid #e5e5e5;
      padding: 2rem;
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
  }

  &-linear {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    height: 100%;
    background: #ffffff80;
    backdrop-filter: blur(0.8rem);

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

  &-body {
    &-types {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 2rem;
      padding-bottom: 1rem;
    }

    &-list {
      padding: 1rem 2rem 2rem 2rem;
      display: flex;
      flex-direction: column;
      width: 100%;
      row-gap: 1rem;
      max-height: 25rem;
      overflow: scroll;
    }

    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      border-radius: 0.4rem;

      &:hover {
        background: #f1f9fe;
      }

      &-name {
        display: flex;
        align-items: center;
        gap: 0.8rem;
      }
    }
  }
}
</style>
  