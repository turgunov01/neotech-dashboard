<template>
  <div class="stats">
    <nav class="stats-container">
      <p class="stats-title">Статистика</p>
      <ul class="stats-list">
        <li class="stats-item">
          <nuxt-link class="stats-button" @click="toggleStats($event)" id="pc" to="/dashboard">ПК</nuxt-link>
        </li>
        <li class="stats-item">
          <p class="stats-button" id="mobile">Мобильный</p>
        </li>
        <li class="stats-item">
          <p class="stats-button" id="tab">Планшет</p>
        </li>
      </ul>
    </nav>
    <div class="stats-blocks">
      <div class="stats-left">
        <block-template :item="views" />
        <block-template :item="forms" />
        <linear-template :item="browsers" />
      </div>
      <div class="stats-right">
        <block-template :item="timer" />
        <!-- :develop=true - convertion into developer mode and hiding the data from server -->
        <views-template :item="pageViews" :develop="true" />
        <!-- :develop=true - convertion into developer mode and hiding the data from server -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import blockTemplate from "~/components/stats/block.template.vue";
import linearTemplate from "~/components/stats/linear.template.vue";
import viewsTemplate from "~/components/stats/views.template.vue";

const toggleBtns = () => {
  const btns = document.querySelectorAll(".stats-button");
  const params = useRoute().query;

  btns.forEach((item: any) => {
    item.classList.remove("active");
    if (item.id == params.stats) {
      item.classList.add("active");
    }
  });
};

const toggleStats = (e: any) => {
  const item = e.target;
  if (item) {
    const router = useRouter();

    router.push({ query: { stats: `${item.id}` } });
  }

  setTimeout(() => {
    location.reload();
  }, 1500);
};

const views = reactive({
  name: "Посещаемость",
  count: 0,
  type: "просмотр страниц",
});

const timer = {
  name: "Время провождения на сайте",
  count: "00:00",
  type: "",
};

const forms = reactive({
  name: "Заявка на форму",
  count: 0,
  type: "",
});

const pageViews = {
  name: "Просмотры",
  count: 10,
  type: "",
};

const browsers = reactive({
  name: "Браузеры",
  count: 10,
  type: "",
  browsers: [
    {
      name: "Chrome",
      count: 0,
    },
    {
      name: "Firefox",
      count: 0,
    },
    {
      name: "Safari",
      count: 0,
    },
    {
      name: "Opera",
      count: 0,
    },
    {
      name: "Other",
      count: 0,
    },
  ],
});

const fetchData = async () => {

  await apiDataFetch("/api/stats", "GET")
    .then((response) => response.json())
    .then((response) => {
      const data = response.data;

      data.users.forEach((item: any) => {
        views.count += item.visitCount;
      });

      browsers.browsers.forEach((item) => {
        if (item.name === "Chrome") {
          item.count += data.stats.totalChromeBrowsers;
        } else if (item.name === "Safari") {
          item.count += data.stats.totalSafariBrowsers;
        } else if (item.name === "Firefox") {
          item.count += data.stats.totalFirefoxBrowsers;
        } else if (item.name === "Opera") {
          item.count += data.stats.totalOperaBrowsers;
        } else {
          item.count += data.stats.totalOtherBrowsers;
        }
      });
    });

  await apiDataFetch("/api/messages/", "GET")
    .then((response) => response.json())
    .then((response) => {
      const data = response.data;

      forms.count += data.messages.length;
    });
};

const timeCount = () => {
  const startTime = new Date().getTime()

  window.onbeforeunload = () => {
    const endTime = new Date().getTime()
    const overall = endTime - startTime

    localStorage.setItem("Time", overall.toString())
  }
}

onMounted(async () => {
  toggleBtns();
  timeCount()
  await fetchData();
});
</script>

<style lang="scss" scoped>
.stats {
  border-radius: 0.4rem;

  &-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 2.4rem;
    width: 100%;
    background: white;
  }

  &-title {
    font-size: 2rem;
    line-height: 140%;
  }

  &-list {
    display: flex;
    align-items: center;
  }

  &-item {

    & a,
    p {
      border-radius: 0.4rem;
      width: 12rem;
      height: 4rem;
      color: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #e5e5e5;

      &.active {
        border: 0.1rem solid #e5e5e5;
        background: #f1f9fe;
        color: #0054ff;
      }
    }

    & p {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  &-blocks {
    display: flex;
    max-width: 100%;
    gap: 3.2rem;
    margin-top: 3.2rem;
  }

  &-left,
  &-right {
    width: 50%;
    gap: 3.2rem;
    display: flex;
    flex-direction: column;
  }
}
</style>
