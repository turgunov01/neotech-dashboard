<template>
  <div class="messages">
    <div class="message-container" v-if="loaded">
      <div class="message-incoming message-box">
        <mess :arr="messages" :type="'incoming'" />
        <div class="reader">
          <div class="reader-methods">
            <div class="reader-fn" @click="favourite(id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10.7921 2.43915C10.5429 1.67165 9.45709 1.67165 9.20709 2.43915L7.94126 6.33415C7.88674 6.50136 7.78071 6.64703 7.63836 6.75032C7.49601 6.8536 7.32463 6.9092 7.14876 6.90915H3.05376C2.24709 6.90915 1.91042 7.94248 2.56376 8.41748L5.87709 10.8242C6.01942 10.9276 6.12534 11.0735 6.17968 11.2408C6.23402 11.4082 6.23399 11.5885 6.17959 11.7558L4.91459 15.6508C4.66459 16.4183 5.54376 17.0575 6.19626 16.5825L9.50959 14.1758C9.652 14.0723 9.82353 14.0165 9.99959 14.0165C10.1756 14.0165 10.3472 14.0723 10.4896 14.1758L13.8029 16.5825C14.4554 17.0575 15.3346 16.4192 15.0846 15.6508L13.8196 11.7558C13.7652 11.5885 13.7652 11.4082 13.8195 11.2408C13.8738 11.0735 13.9798 10.9276 14.1221 10.8242L17.4354 8.41748C18.0879 7.94248 17.7529 6.90915 16.9454 6.90915H12.8496C12.6739 6.90902 12.5027 6.85334 12.3605 6.75007C12.2183 6.6468 12.1124 6.50122 12.0579 6.33415L10.7921 2.43915Z"
                  stroke="#919192" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p class="reader-fn-title">Добавить в избранные</p>
            </div>
          </div>
          <div class="reader-box">
            <div class="reader-header">
              <p class="reader-title">
                {{ area.reply_to.author }} {{ area.reply_to.author ? "/" : "" }} {{ area.reply_to.email }}
                {{ area.reply_to.email ? "/" : "" }} {{ area.reply_to.phone }}
                {{ area.reply_to.phone ? "/" : "" }}
              </p>
              <p class="reader-date">
                {{ area.reply_to.date }}
              </p>
            </div>
            <div class="reader-template" v-html="area.reply_to.message"></div>
            <div class="reader-reply">
              <p>Reply to: {{ area.reply_to.email }}</p>
              <textarea class="reader-reply-box" name="reader-reply-to" id="reply" cols="30" rows="10"
                @input="input($event)"></textarea>
            </div>
            <div class="buttons">
              <button class="send" @click="send">Отправить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script lang="ts" setup>
import mess from "~/components/sidebars/messages.vue";
const $router = useRouter();

let loaded = ref(false);
const id = Number(useRoute().params.id);

const messages = reactive({
  title: "incoming",
  items: [],
});

const idx = messages.items.findIndex((msg: any) => msg.id === id);

let area = reactive({
  id: 0,
  author: "Neotech",
  message: "",
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  email: "support@neotech.uz",
  date: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
  type: "incoming",
  reply_to: 0,
  phone: "",
});

const input = (e: any) => {
  area.message = e.target.value;
};

const getList = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Content-Language": "en",
      Authorization: `Bearer ${await checkToken()}`
    },
  };

  await apiDataFetch(`/api/messages/`, options)
    .then((res) => res.json())
    .then((res) => {
      const data = res.data;
      const id = Number(useRoute().params.id);

      const active = data.messages.find((msg: Object | any) => msg.id === id);
      area.reply_to = { ...active };

      data.messages.forEach((item: Object | any, index: Number | any) => {
        if (item.id == id) {
          delete item.isFav;
          messages.items.push(item);
        } else {
          messages.items.push(item);
        }
      });

      console.log(area.phone);
    });
};

const send = async () => {
  const index = messages.items.findIndex((msg: any) => msg.id === id);

  const message = {
    id: area.id,
    author: "support@neotech.uz",
    message: area.message,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    email: area.reply_to.email,
    date: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
    type: "outgoing",
    reply_to: area.reply_to.id,
    phone: area.reply_to.phone,
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Language": "en",
      "Authorization": `Bearer ${await checkToken()}`
    },
    body: JSON.stringify(message)
  }

  await apiDataFetch("/api/messages", options)
    .then((response: Response | any) => response.json())
    .then((response: Response | any) => {
      console.log(response)
    })


  console.log(message)
};

const favourite = async (id: Number | String) => {
  const index = messages.items.findIndex((item: any) => item.id === id);
  const favourite = messages.items[index];

  if (index !== -1) {
    area.reply_to.isFav = true;
    area.reply_to.type = "favourite"
    area.reply_to.prevType = "incoming"
  }

  const params = {
    method: "PUT",
    headers: {
      "Content-Language": "en",
      "Content-Type": "application/json",
      Authorization: `Bearer ${await checkToken()}`
    },
    body: JSON.stringify(area.reply_to),
  };

  console.log(area);

  await apiDataFetch(`/api/messages/favourite/${index}`, params)
    .then((res) => res.json())
    .then((res) => {
      const data = res;
      console.log(data);
    });

  useRouter().push({ path: "/messages/incoming/" });
};

const mount = onMounted(() => {
  getList();
  loaded.value = true;
});
</script>
    
<script lang="ts">
export default {
  data: () => {
    return {
      loaded: false,
    };
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

  &-methods {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 2.5rem;
    margin-bottom: 3.2rem;
    border-radius: 0.4rem;
    border: 1px solid #e5e5e5;
  }

  &-fn {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    cursor: pointer;
  }

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
  padding: 1.1rem 0;
}

.buttons {
  display: flex;
  align-items: center;
  gap: 2.4rem;
  margin-top: 2.4rem;

  & label {
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;

    & img {
      width: 2.4rem;
      height: 2.4rem;
    }
  }
}
</style>
    