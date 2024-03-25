<template>
  <draggable :list="data" :disabled="!enabled" class="list-group" ghost-class="ghost" @start="dragging = true"
    @end="dragging = false">
    <template #item="{ element }">
      <div class="list-group-item">
        <span @click="$emit('delete', $event)"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
            viewBox="0 0 20 20" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M3 7C3 6.73478 3.10536 6.48043 3.29289 6.29289C3.48043 6.10536 3.73478 6 4 6H16C16.2652 6 16.5196 6.10536 16.7071 6.29289C16.8946 6.48043 17 6.73478 17 7C17 7.26522 16.8946 7.51957 16.7071 7.70711C16.5196 7.89464 16.2652 8 16 8H4C3.73478 8 3.48043 7.89464 3.29289 7.70711C3.10536 7.51957 3 7.26522 3 7ZM3 13C3 12.7348 3.10536 12.4804 3.29289 12.2929C3.48043 12.1054 3.73478 12 4 12H16C16.2652 12 16.5196 12.1054 16.7071 12.2929C16.8946 12.4804 17 12.7348 17 13C17 13.2652 16.8946 13.5196 16.7071 13.7071C16.5196 13.8946 16.2652 14 16 14H4C3.73478 14 3.48043 13.8946 3.29289 13.7071C3.10536 13.5196 3 13.2652 3 13Z"
              fill="#0054FF" />
          </svg></span>
        <div class="draggable-content">
          <div style="width: 100%" v-if="element.type !== 'img' &&
    element.type !== 'button' &&
    element.type !== 'video'
    ">
            <text-editor :content="text" :element="element" />
          </div>
          <div v-if="element.type === 'button' && !element.editorData.length">
            <div class="button">
              <input type="text" placeholder="Название кнопки" @input="name($event)" v-model="element.name"
                class="button-name" :style="{
    background: `${button.background}`,
    borderColor: `${button.border}`,
  }" />
              <div class="button-color">
                <palette :type="'фона'" :style="button" :parent="element" />
              </div>
            </div>
          </div>
          <div v-if="element.type === 'button' && element.editorData.length">
            <div v-html="element.editorData"></div>
          </div>
          <div v-if="element.type === 'img'">
            <label for="image64" class="element-label">
              <img src="../src/assets/images/image.svg" class="element-type" alt="" />
              <p class="element-title">Загрузить изображение</p>
              <p class="element-weight">Максимальный файл 3МБ</p>
              <input type="file" @change="inputImage($event)" hidden id="image64" />
            </label>
          </div>
        </div>
      </div>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import draggable from "vuedraggable";
import palette from "./palette.vue";
import TextEditor from "./textEditor.vue";
const query = useRoute().query.page;

const props = defineProps({
  data: {
    required: true,
    type: Array,
  },
});

const button = reactive({
  background: "",
  border: "",
  color: "",
  name: "",
  padding: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  rounded: 0,
});

const name = (e: any) => {
  function containsSymbols(text: string | any) {
    const symbolRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
    return symbolRegex.test(text);
  }

  if (containsSymbols(e.target.value) === true) {
    e.target.placeholder = `Символы недопустимы для название кнопки`;
    setTimeout(() => {
      e.target.placeholder = `Название блока`;
    }, 2000);
  } else {
    button.name = e.target.value;
  }
};

const text = reactive({
  text: "",
  fontSize: 16,
  fontWeight: "",
  fontStyle: "none",
  fontColor: "",
  textDecoration: "none",
  listStyle: "none",
  position: "left",
  image: {
    hasImage: false,
    imageName: "",
    url: "",
  },
  link: {
    hasLink: false,
    textWithLink: "",
    url: "",
  },
});

const inputImage = (e: any) => {
  const file = e.target.files[0];

  console.log(file)
};
</script>

<script lang="ts">
export default {
  components: { palette, TextEditor },
  data: () => {
    return {
      enabled: true,
      dragging: false,
    };
  },
  emits: ["delete"],
};
</script>

<style lang="scss" scoped>
.draggable {
  &-content {
    width: 100%;
    position: relative;
    z-index: 999;
  }
}

.list-group-item {
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 100%;
  position: relative;

  margin-bottom: 2.4rem;

  &>.ck-editor {
    width: 100%;
  }
}

.image-block {
  background: unset;
  border-radius: 0.8rem;

  & label {
    width: 30rem;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 4px;
    border: 1px solid #8a98ac;
    background: #efefef;
    row-gap: 1.6rem;
    padding: 2.4rem 3rem;

    & p {
      font-size: 1.2rem;
      color: rgba(0, 0, 0, 0.54);
      font-weight: 500;
      max-width: 90%;
      text-align: center;
    }
  }
}

.image-url {
  max-width: 100%;
  padding: 0.5rem;

  & label {
    padding: 0;
    border: none;
  }

  & img {
    max-width: 100%;
    width: 100%;
    object-fit: cover;
    height: 15rem;
  }
}

.button {
  padding: 2.4rem;
  border-radius: 0.4rem;
  border: 0.1rem solid #e5e5e5;
  width: 40rem;

  &-save {
    color: #365ba7;
    border: none;
    background: unset;
    border-bottom: 1px solid #e5e5e5;
    width: 100%;
    padding: 1.5rem 0;
    text-align: center;
    cursor: pointer;

    &:active {
      background: #efefef;
      cursor: grabbing;
    }
  }

  &-tick {
    position: relative;
  }

  &-name {
    width: 100%;
    padding: 1.5rem 0.5rem;
    border-radius: 0.4rem;
    text-align: center;
    border: 1px solid;
    outline: none;
    color: #365ba7;

    &:focus {
      border: 1px solid #365ba7;
    }

    &::placeholder {
      text-align: center;
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 120%;
      letter-spacing: 0.017rem;
      color: #365ba7;
    }
  }
}

.element {
  &-label {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    row-gap: 1rem;
    max-width: 40rem;
    width: 100%;
    padding: 2.4rem;
    border: 1px solid #e5e5e5;
    border-radius: 0.4rem;
  }

  &-title {
    font-size: 1.5rem;
  }

  &-weight {
    font-size: 1.2rem;
    color: #8a98ac;
    line-height: 120%;
  }
}
</style>
