<template>
  <div class="blocks">
    <p class="blocks-sidebar-title">Блоки</p>
    <ul class="blocks-list">
      <draggable
        :list="data"
        :disabled="!enabled"
        class="list-group"
        ghost-class="ghost"
        @start="dragging = true"
        @end="dragging = false"
      >
        <template #item="{ element }">
          <div class="list-group-item">
            <p @click="getQuery($event)" :id="`${element.id}`">
              {{ element.name }}
            </p>
            <span
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 7C3 6.73478 3.10536 6.48043 3.29289 6.29289C3.48043 6.10536 3.73478 6 4 6H16C16.2652 6 16.5196 6.10536 16.7071 6.29289C16.8946 6.48043 17 6.73478 17 7C17 7.26522 16.8946 7.51957 16.7071 7.70711C16.5196 7.89464 16.2652 8 16 8H4C3.73478 8 3.48043 7.89464 3.29289 7.70711C3.10536 7.51957 3 7.26522 3 7ZM3 13C3 12.7348 3.10536 12.4804 3.29289 12.2929C3.48043 12.1054 3.73478 12 4 12H16C16.2652 12 16.5196 12.1054 16.7071 12.2929C16.8946 12.4804 17 12.7348 17 13C17 13.2652 16.8946 13.5196 16.7071 13.7071C16.5196 13.8946 16.2652 14 16 14H4C3.73478 14 3.48043 13.8946 3.29289 13.7071C3.10536 13.5196 3 13.2652 3 13Z"
                  fill="#0054FF"
                /></svg
            ></span>
          </div>
        </template>
      </draggable>
    </ul>
    <div class="blocks-new" @click="addNew()">
      <div class="blocks-new-add">
        <span>+</span>
        <button class="blocks-new-button">Добавить блок</button>
      </div>
    </div>
    <div class="blocks-modal" v-if="opened">
      <div class="blocks-modal-wrapper">
        <p class="blocks-modal-name">Название блока</p>
        <input type="text" v-model="layers.name" />
        <button class="blocks-modal-button" @click="addValue(), addNew()">
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const query = useRoute().query;
const props = defineProps({
  data: {
    required: true,
    type: Array,
  },
});
const getQuery = (e: any) => {
  useRouter().push({
    query: {
      page: e.target.id,
    },
  });

  setTimeout(() => {
    location.reload();
  }, 100);
};

const layers = reactive({
  id: 1,
  name: "",
  layers: [],
  position: 1,
});

const addValue = () => {
  if (!layers.name) return alert("Заполните все поля");
  else props.data.push(layers);

};
</script>

<script lang="ts">
import draggable from "vuedraggable";

export default {
  components: { draggable },
  order: 0,
  data() {
    return {
      enabled: true,
      header: {},
      dragging: false,
      opened: false,
    };
  },
  methods: {
    addNew() {
      this.opened = !this.opened;
    },
  },
};
</script>

<style scoped lang="scss">
.blocks {
  max-width: 25rem;
  width: 100%;
  border: 1px solid #e5e5e5;
  border-radius: 0.4rem;

  &-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;

    &-wrapper {
      background: white;
      width: 100%;
      max-width: 30rem;
      padding: 2.4rem;
      border-radius: 0.8rem;
      height: 25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 2.5rem;

      & input {
        width: 100%;
        padding: 0.5rem 1rem;
      }

      & button {
        width: 80%;
        height: 3.5rem;
        background: #c8ebfb;
        color: #0054ff;
        font-size: 1.5rem;
        line-height: 125%;
        border: none;
      }
    }
  }

  &-sidebar {
    &-title {
      font-size: 2rem;
      font-weight: 500;
      line-height: 130%;
      padding: 2.4rem 2.4rem 1.6rem;
    }
  }

  &-list {
    padding: 1.6rem 1.4rem;
    display: flex;
    flex-direction: column;
    row-gap: 0.8rem;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;

    &-button {
      padding: 1rem;
      border-radius: 0.4rem;
      cursor: pointer;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 1.5rem;
      line-height: 140%;
      font-weight: 500;

      & span {
        width: 2rem;
        height: 2rem;
      }

      &.active,
      &:hover {
        background: #e3f2fd80;
        color: #0054ff;

        & svg > path {
          fill: #0054ff;
        }
      }
    }
  }

  &-new {
    padding: 1.6rem 1.4rem;
    &-add {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #e3f2fd80;
      border-radius: 0.4rem;
      color: #0054ff;
      width: 100%;
      gap: 0.8rem;

      & span {
        width: 2rem;
        height: 2rem;
        display: grid;
        place-items: center;
      }
    }

    &-button {
      background: unset;
      color: #0054ff;
      font-size: 1.5rem;
      font-weight: 500;
      border: none;
      outline: none;
      padding: 1.1rem 0;
      cursor: pointer;
    }
  }
}

.buttons {
  margin-top: 35px;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.not-draggable {
  cursor: no-drop;
}

.list-group-item {
  background: unset;
  font-size: 1.5rem;
  line-height: 125%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
}

.list-group-item:not(:first-of-type) {
  margin-top: 2rem;
}

.list-group-item > span {
  width: 2rem;
  height: 2rem;
}

.list-group-item p {
  width: 100%;
}

.text-edit {
  display: flex;
  width: 100%;
}

.draggable-edit-input {
  width: 100%;
  padding: 0.5rem;
}

input {
  width: 100%;
}

.input-text {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
}

.input-text button {
  padding: 0.675rem 2rem;
  border-radius: 0.4rem;
  border: 1px solid var(--gray-divider, #e5e5e5);
  background: var(--white-high-emphasis, #fff);
  cursor: pointer;
}

.input-text button:hover {
  background: #e5e5e5;
}

a {
  color: black !important;
}
</style>
