<template>
  <div class="messages">
    <div class="message-container" v-if="loaded">
      <div class="message-incoming message-box">
        <mess :arr="messages.items" />
        <div :class="query.type" class="reader">
          <div class="reader-box" v-if="query.message === 'select' || !query.message">
            <p class="reader-empty">
              Выберите сообщение которое хотели прочитать
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import mess from "~/components/sidebars/messages.vue";

const $router = useRouter();
$router.push({ path: "/messages/incoming" });
</script>

<script lang="ts">
export default {
  data: () => {
    return {
      query: useRoute().query,
      loaded: false,
      messages: {
        title: useRoute().query.type ? useRoute().query.type : "incomings",
        items: [],
      },
    };
  },
  methods: {
    async getMessages() {
      await apiDataFetch("/api/messages", {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${await checkToken()}` },
      })
        .then((response) => response.json())
        .then((response) => {
          const data = response.data;

          data.messages.forEach((item) => {
            this.messages.items.push(item);
          });
        });
    },
  },
  async mounted() {
    await this.getMessages();
    this.loaded = true;
  },
};
</script>

<style lang="scss" scoped>
.message {
  &-box {
    display: flex;
    gap: 3.2rem;
    align-items: flex-start;
    overflow: hidden;
  }
}

.reader {
  overflow: scroll;
  width: 100%;
  height: 77.3rem;

  &-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 70rem;
  }

  &-box {
    padding: 2.4rem;
    border: 1px solid #e5e5e5;
    border-radius: 0.4rem;
  }

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-title {
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 130%;
  }

  &-template {
    padding: 2.4rem;
    border: 1px solid #e5e5e5;
    border-radius: 0.4rem;
    margin: 2.4rem 0;
  }

  &-reply {
    border: 1px solid #e5e5e5;
    border-radius: 0.4rem;
    padding: 2.4rem;

    &-box {
      font-family: "Roboto";
      font-size: 1.6rem;
      line-height: 130%;
      outline: none;
      width: 100%;
      max-height: 20rem;
      margin-top: 2rem;
      border: none;
      resize: none;
      background: unset;
    }
  }
}

.send {
  background: #e2f0fd;
  color: #0054ff;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 130%;
  border-radius: 0.4rem;
  border: none;
  width: 100%;
  max-width: 23rem;
  margin-top: 2.4rem;
  padding: 1.1rem 0;
}
</style>
