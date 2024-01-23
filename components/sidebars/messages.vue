<template>
  <div class="messages">
    <h1 class="messages-title" v-if="arr.title === 'incoming'">Входящие</h1>
    <h1 class="messages-title" v-else-if="arr.title === 'outgoing'">
      Отправленные
    </h1>
    <h1 class="messages-title" v-else-if="arr.title === 'favourite'">
      Избранные
    </h1>
    <h1 class="messages-title" v-else-if="!arr.title">Входящие</h1>
    <ul class="messages-list">
      <li class="messages-item" :id="i + 1" @click="navigate(a.type, a.id)" v-for="(a, i) in arr.items" :key="i + 1">
        <div class="filter" v-if="a.isFav && $router.currentRoute.value.path.includes('favourite')">
          <p class="messages-substr">
            {{ a.message.substr(0, 60)
            }}{{ a.message.length > 60 ? "..." : "" }}
          </p>
          <p class="messages-author">{{ a.author }}</p>
          <div class="date">
            <p class="date-day">{{ a.date ? a.date : `` }}</p>
            <p class="date-time">{{ a.time }}</p>
          </div>
        </div>
        <div class="filter" v-if="!a.isFav && a.type === 'outgoing' && $router.currentRoute.value.path.includes('outgoing')">
          <p class="messages-substr">
            {{ a.message.substr(0, 60)
            }}{{ a.message.length > 60 ? "..." : "" }}
          </p>
          <p class="messages-author">{{ a.author }}</p>
          <div class="date">
            <p class="date-day">{{ a.date ? a.date : `` }}</p>
            <p class="date-time">{{ a.time }}</p>
          </div>
        </div>
        <div class="filter" v-if="!a.isFav && a.type === 'incoming' && $router.currentRoute.value.path.includes('incoming')">
          <p class="messages-substr">
            {{ a.message.substr(0, 60)
            }}{{ a.message.length > 60 ? "..." : "" }}
          </p>
          <p class="messages-author">{{ a.author }}</p>
          <div class="date">
            <p class="date-day">{{ a.date ? a.date : `` }}</p>
            <p class="date-time">{{ a.time }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  arr: {
    required: true,
    type: Object,
  },
  type: {
    required: true,
    type: String,
    default: "incoming",
  },
});

const navigate = (value: string | any, index: number) => {
  if (value !== "favourite") {
    useRouter().push({
      path: `/messages/${value}/${index}`,
    });
  } else {
    useRouter().push({
      path: `/messages/favourite/${index}`,
    });
  }
};

const date = new Date();
</script>

<script lang="ts">
export default {
  methods: {},
};
</script>

<style lang="scss" scoped>
.filter {
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 2.4rem;
  border-bottom: 1px solid #e5e5e5;

  &.fav {
    position: relative;

    &::after {
      content: url("../../src/assets/images/star");
      position: absolute;
      right: 2.4rem;
      top: 1.6rem;
      width: 0.8rem;
      height: 0.8rem;
      background: #3cc13b;
      border-radius: 50%;
    }
  }
}

.messages {
  border: 1px solid #e5e5e5;
  max-width: 35.4rem;
  width: 100%;

  &-title {
    font-size: 2rem;
    font-weight: 500;
    letter-spacing: 0.015rem;
    line-height: 150%;
    border-bottom: 1px solid #e5e5e5;
    padding: 2.4rem;
    padding-bottom: 1.6rem;
  }

  &-list {
    overflow: scroll;
    height: 100%;
    min-height: 70rem;
    max-height: 70rem;
  }

  &-item {
    &:hover {
      background: #e3f2fd80;
      cursor: pointer;
    }
  }

  &-substr {
    font-size: 1.4rem;
    line-height: 130%;
    font-weight: 500;
    letter-spacing: 0.01rem;
  }

  &-author {
    font-size: 1.2rem;
    line-height: 130%;
    opacity: 0.5;
    margin: 0.8rem 0;
  }

  & .date {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.8rem;

    & * {
      font-size: 1.2rem;
      font-weight: 400;
      line-height: 130%;
      opacity: 0.5;
    }
  }
}
</style>
