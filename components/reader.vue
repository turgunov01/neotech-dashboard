<template>
  <div :class="query.type" class="reader">
    <div class="reader-box" v-if="query.message === 'select'">
      <p class="reader-empty">Выберите сообщение которое хотели прочитать</p>
    </div>
    <div class="reader-box" v-else>
      <div class="reader-header">
        <p class="reader-title">{{ item.author }}</p>
        <p class="reader-date">date</p>
      </div>
      <!-- <div class="reader-template" v-html="item.message"></div> -->
      <div class="reader-reply">
        <p>Reply to: sardor</p>
        <textarea
          class="reader-reply-box"
          name="reader-reply-to"
          id="reply"
          cols="30"
          rows="10"
          v-model="msg.text"
        ></textarea>
      </div>
      <button class="send" @click="sendMessage()">Отправить</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const date = new Date();
const props = defineProps({
  query: {
    required: true,
    type: Object,
  },
  item: {
    required: true,
    type: Object,
  },
  consumer: {
    required: true,
    type: Object,
  },
});

const msg = ref({
  text: "",
  author: "info@neotech.uz",
  date: `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`,
  timer: `${date.getHours()}:${date.getMinutes()}`,
});

const sendMessage = () => {
  props.consumer.messages.push(msg.value);
  console.log(props.consumer);
};
</script>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped>
</style>
