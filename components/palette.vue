<template>
  <div class="color">
    <div class="color-wrapper">
      <p class="color-title">Выбор цвета Фона кнопки</p>
      <div class="color-input">
        <input
          type="text"
          placeholder="Код цвета"
          maxlength="9"
          @input="check($event, '#', `background`)"
          v-model="style.background"
        />
        <div
          class="color-box"
          :style="{
            background: `${color.background}`,
            width: '1.8rem',
            height: '1.8rem',
          }"
        ></div>
      </div>
    </div>
    <div class="color-wrapper">
      <p class="color-title">Выбор цвета контура кнопки</p>
      <div class="color-input">
        <input
          type="text"
          placeholder="Код цвета"
          maxlength="9"
          @input="check($event, '#', 'border')"
          v-model="style.border"
        />
        <div
          class="color-box"
          :style="{
            background: `${color.border}`,
            width: '1.8rem',
            height: '1.8rem',
          }"
        ></div>
      </div>
    </div>
    <div class="color-wrapper">
      <p class="color-title">Выбор цвета текста кнопки</p>
      <div class="color-input">
        <input
          type="text"
          placeholder="Код цвета"
          maxlength="9"
          @input="check($event, '#', 'color')"
          v-model="style.color"
        />
        <div
          class="color-box"
          :style="{
            background: `${color.color}`,
            width: '1.8rem',
            height: '1.8rem',
          }"
        ></div>
      </div>
    </div>
    <div class="color-wrapper">
      <p class="color-title">Параметры:</p>
      <div class="color-params">
        <span>
          <p>Top</p>
          <input
            type="number"
            placeholder="Отступ сверху"
            v-model="style.padding.top"
          />
        </span>
        <span>
          <p>Right</p>
          <input
            type="number"
            placeholder="Отступ сверху"
            v-model="style.padding.right"
          />
        </span>
        <span>
          <p>Bottom</p>
          <input
            type="number"
            placeholder="Отступ сверху"
            v-model="style.padding.bottom"
          />
        </span>
        <span>
          <p>Left</p>
          <input
            type="number"
            placeholder="Отступ сверху"
            v-model="style.padding.left"
          />
        </span>
      </div>
      <div class="color-radius">
        <span>
          <p>Radius: {{ color.rounded }}</p>
          <input
            type="range"
            min="1"
            max="100"
            class="slider"
            @change="range($event)"
            v-model="style.rounded"
          />
        </span>
      </div>
    </div>
    <div class="buttons">
      <button class="button-save" @click="save(props.style, props.parent)">Сохранить</button>
      <button class="button-save" @click="prevent">Отмена</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  style: {
    required: true,
    type: Object,
  },
  parent: {
    required: true,
    type: Object,
  }
});

const color = reactive({
  background: "",
  border: "",
  padding: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  rounded: 0,
});

const save = (value: any, parent: any) => {
  const newItem = {
    id: 0,
    type: parent.type,
    name: props.style.name,
    editorData: `<button class="button" 
    style="background: ${props.style.background}; border-color: ${props.style.border};
     padding: ${props.style.padding.top / 10}rem ${props.style.padding.right / 10}rem ${
      props.style.padding.bottom / 10
    }rem ${props.style.padding.left / 10}rem; border-radius: ${
      props.style.rounded / 10
    }rem; color: ${props.style.color}"> ${props.style.name} </button>`,
  };

  parent["name"] = newItem.name;
  parent["type"] = newItem.type;
  parent["editorData"] = newItem.editorData;

};

const range = (e: any) => {
  const value = e.target.value;

  props.style.rounded = value;
  color.rounded = props.style.rounded;
  console.log(props.style);
};

const check = (e: any, value: any, placeholder: any) => {
  const regex = new RegExp(value);
  if (!regex.test(e.target.value)) {
    e.target.value = "";
    e.target.placeholder = "(#) is required: (#ffffff)";
    setTimeout(() => {
      e.target.placeholder = "Код цвета";
    }, 2000);
  } else {
    color[placeholder] = e.target.value;
  }
};
</script>

<style scoped lang="scss">
.color {
  width: 100%;
  height: 100%;
  margin-top: 2.1rem;

  &-wrapper {
    margin-bottom: 1.2rem;
  }

  &-params {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.8rem;

    & span {
      width: calc(100% / 2 - 0.8rem);
      & p {
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 120%;
      }

      & input {
        background: #e5e5e5;
        margin-top: 0.6rem;
        margin-bottom: 0.6rem;
      }
    }
  }

  &-title {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
    line-height: 120%;
    letter-spacing: 0.01rem;
    color: #8a98ac;
  }

  &-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    background: #f5f2f2;
  }
  &-box {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
  }

  & input {
    background: unset;
    border: none;
    border-bottom: 1px solid #e5e5e5;
    padding: 1.5rem 0.5rem;
    outline: none;
    width: 100%;
  }
}
</style>
