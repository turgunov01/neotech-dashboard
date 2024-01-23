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
    <div class="lines">
      <div
        class="line"
        v-for="(el, index) in item.browsers"
        :key="index"
        :style="{
          background: `${colors[index]}`,
          width: `${(sum[index] / percentage) * 100}%`,
        }"
      ></div>
    </div>
    <div
      class="stats-block-body"
      v-for="(a, index) in item.browsers"
      :key="index"
    >
      <div class="stats-block-span">
        <span
          class="line-browser-color"
          :style="{
            background: colors[index],
          }"
        ></span>
        <div class="line-browser-name">{{ a.name }}</div>
      </div>
      <div class="stats-block-overall">
        <p class="stats-overall-percent">{{ percents[index] }}%</p>
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
      type: Array,
    },
    develop: {
      required: true,
      type: Boolean,
    },
  },
  data: () => {
    return {
      sum: [],
      percents: [],
      percentage: 0,
      colors: ["#365BA7", "#EA654A", "#A2CB71", "#9E59B3", "#85B4E3"],
    };
  },
  methods: {
    getCount() {
      setTimeout(() => {
        const randomize = (val) => {
          return Math.floor(Math.round(val));
        };
        this.item.browsers.forEach((item) => {
          this.sum.push(item.count);
          this.percentage += item.count;
        });

        this.percents = this.sum.map((num) =>
          Math.floor(Math.round((num / this.percentage) * 100))
        );
      }, 1000);
    },
  },
  mounted() {
    this.getCount();
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

    &-span {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

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
      margin-top: 2.4rem;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
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
}

.lines {
  width: 100%;
  background: #e5e5e5;
  display: flex;
  align-items: center;
  margin: 3.2rem 0;
}

.line {
  height: 2rem;

  &-browser {
    &-color {
      width: 1.3rem;
      height: 1.3rem;
      border-radius: 50%;
    }
  }
}
</style>
