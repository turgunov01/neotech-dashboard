<template>
  <div class="element-box">
    <div class="element-methods" v-if="element.isView">
      <div class="element-fontSize">
        <button class="element-fontSize-dec" @click="content.fontSize--">
          -
        </button>
        <input
          type="text"
          placeholder="16"
          class="element-fontSize-value"
          maxlength="3"
          v-model="content.fontSize"
        />
        <button class="element-fontSize-inc" @click="content.fontSize++">
          +
        </button>
      </div>
      <div class="element-fontStyle">
        <button
          class="element-fontStyle-bold element-fontStyle-options"
          @click="toggle()"
        >
          <img
            src="../src/assets/images/bold.svg"
            class="element-fontStyle-bold-icon"
            alt=""
          />
          <div class="element-fontStyle-dropdown" v-if="dropdown">
            <span class="element-fontStyle-spans">
              <p @click="styling(4 * 100)" :class="`${4 * 100}`">regular</p>
              <p @click="styling(7 * 100)" :class="`${7 * 100}`">bold</p>
            </span>
          </div>
        </button>
        <button class="element-fontStyle-bold" @click="underline()">
          <img
            src="../src/assets/images/underline.svg"
            class="element-fontStyle-underline-icon"
            alt=""
          />
        </button>
      </div>
      <div class="element-fontColor">
        <div class="element-fontColor">
          <button class="element-fontColor-label" @click="toggleColor()">
            <img src="../src/assets/images/color.svg" alt="" />
            <span class="element-fontColor-color"></span>
          </button>
          <img src="../src/assets/images/chevron.svg" alt="" />
        </div>
        <div class="element-fontColor-dropdown" v-if="hexOpened">
          <input
            type="color"
            placeholder="Код цвета"
            v-model="content.fontColor"
            @input="color($event)"
          />
          <span
            class="element-fontColor-box"
            :style="{
              background: `${content.fontColor}`,
            }"
          ></span>
        </div>
      </div>
      <div class="element-lineHeight">
        <div class="element-lineHeight" @click="toggleHeight()">
          <button class="element-lineHeight-label" @click="toggleHeight()">
            <img
              src="../src/assets/images/color.svg"
              @click="toggleHeight()"
              alt=""
            />
          </button>
          <img
            src="../src/assets/images/updown.svg"
            @click="toggleHeight()"
            alt=""
          />
          <img
            src="../src/assets/images/chevron.svg"
            @click="toggleHeight()"
            alt=""
          />
        </div>
        <div class="element-lineHeight-dropdown" v-if="height">
          <input
            type="text"
            placeholder="Высота текста"
            v-model="content.lineHeight"
            @input="lineHeight($event)"
          />
        </div>
      </div>
      <div class="element-styler">
        <button class="element-styler-bold">
          <img
            src="../src/assets/images/listing.svg"
            class="element-styler-bold-icon"
            alt=""
          />
        </button>
        <button class="element-styler-bold">
          <img
            src="../src/assets/images/numbering.svg"
            class="element-styler-underline-icon"
            alt=""
          />
        </button>
        <button class="element-styler-bold">
          <div class="element-styler-positions">
            <img
              src="../src/assets/images/positioning.svg"
              class="element-styler-underline-icon"
              alt=""
              id="left"
            />
          </div>
          <img src="../src/assets/images/chevron.svg" alt="" />
        </button>
      </div>
      <div class="element-styler">
        <button class="element-styler-bold">
          <img
            src="../src/assets/images/link.svg"
            class="element-styler-bold-icon"
            alt=""
          />
        </button>
        <button class="element-styler-bold">
          <img
            src="../src/assets/images/image.svg"
            class="element-styler-underline-icon"
            alt=""
          />
        </button>
      </div>
    </div>
    <div class="element-content">
      <div
        class="element-content-view"
        v-html="element.editorData"
        v-if="!element.isView"
        @dblclick="element.isView = !element.isView"
      ></div>
      <textarea
        name="element-content-textarea"
        cols="30"
        rows="10"
        v-if="element.isView"
        v-model="element.text"
        @input="update($event, element)"
        :style="{
          fontSize: `${content.fontSize / 10}rem`,
          fontWeight: `${content.fontWeight}`,
          textDecoration: `${content.textDecoration}`,
          color: `${content.fontColor}`,
          lineHeight: `${content.lineHeight / 10}rem`,
        }"
      >
      </textarea>
      <button
        class="element-save"
        v-if="element.isView"
        @click="save('underline')"
      >
        Сохранить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  content: {
    required: true,
    type: Object,
  },
  element: {
    required: true,
    type: Object,
  },
});

const styling = (val: any) => {
  if (props.content.fontWeight === val) {
    props.content.fontWeight = "400";
  } else {
    props.content.fontWeight = val;
  }
  console.log(props.content);
};

const update = (e: Event, element: any) => {
  element["text"] = (e.target as HTMLInputElement)?.value;
};

const underline = () => {
  if (props.content.textDecoration == "underline") {
    props.content.textDecoration = "none";
  } else {
    props.content.textDecoration = "underline";
  }
};

const color = (e: any) => {
  const regex = new RegExp(/#/);
  if (!regex.test(props.content.fontColor)) {
    e.target.value = "";
    e.target.placeholder = "символ (#) обязателен";
    setTimeout(() => {
      e.target.placeholder = "Код цвета";
    }, 2000);
  }
  props.content.fontColor = e.target.value;
};

const lineHeight = (e: any) => {
  const checkIfTriple = props.content.fontSize * 2 < e.target.value;

  if (checkIfTriple) {
    props.content.lineHeight = e.target.value;
  } else {
    return;
  }
};

const save = (val: any) => {
  const styles = `
    font-size: ${props.content.fontSize / 10}rem;
    font-weight: ${props.content.fontWeight};
    text-align: ${props.content.position};
    list-style: ${props.content.listStyle};
    text-decoration: ${props.content.textDecoration};
    font-style: ${props.content.fontStyle};
    color: ${props.content.fontColor};
    line-height: ${props.content.lineHeight / 10}rem;
    `;

  const content = `<${props.element.type} style="${styles}" ${
    props.element.type === "img" ? 'src=""' : ""
  }>${props.element.type !== "img" ? props.element.text : ""}${
    props.element.type !== "img" ? "</" + props.element.type + ">" : ""
  }`;

  props.element.editorData = content;
  props.element.isView = false;
  console.log(props.element);
};
</script>

<script lang="ts">
export default {
  data: () => {
    return {
      dropdown: false,
      hexOpened: false,
      height: false,
    };
  },
  methods: {
    toggle(val: any) {
      this.dropdown = !this.dropdown;
    },
    toggleColor() {
      this.hexOpened = !this.hexOpened;
    },
    toggleHeight() {
      this.height = !this.height;
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.element {
  &-content {
    &-view {
      padding: 0.5rem;
    }
    & textarea {
      resize: none;
      margin-top: 0.9rem;
      outline: none;
      width: 100%;
      height: 20rem;
      padding: 0.5rem;
    }
  }

  &-methods {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.8rem;

    & div {
      border-radius: 0.3rem;
    }
  }

  &-fontSize {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: #efefef;
    padding: 0.5rem 0.8rem;

    & button {
      background: unset;
      width: 3rem;
      height: 3rem;
      border: none;
      cursor: pointer;
      color: #8a98ac;
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-value {
      font-size: 1.6rem;
      font-weight: 400;
      width: 4.5rem;
      height: 3rem;
      outline: none;
      background: unset;
      line-height: 187.5%;
      color: #8a98ac;
      border: 1px solid #8a98ac;
      border-radius: 0.4rem;
      text-align: center;
    }
  }

  &-fontStyle {
    display: flex;
    background: #efefef;
    align-items: center;

    &-dropdown {
      position: absolute;
      bottom: -7rem;
      background: #efefef;
      width: 8rem;
      padding: 1rem 0;
      left: 0;

      & span {
        display: flex;
        align-items: center;
        flex-direction: column;
        row-gap: 1rem;

        & p {
          text-align: start;
          width: 100%;
          padding: 0 1.4rem;
        }
      }
    }

    &-options {
      display: flex;
      position: relative;
      flex-direction: column;
    }

    & button {
      font-size: 1.6rem;
      background: unset;
      border: none;
      color: #8a98ac;
      width: 4.2rem;
      height: 4.2rem;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: #dcdcdc;
        cursor: pointer;
      }
    }
  }

  &-fontColor {
    background: #efefef;
    width: 6.4rem;
    height: 4rem;
    position: relative;

    & > .element-fontColor {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    &-dropdown {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: max-content;
    }

    & input {
      max-width: 13rem;
      padding: 0.5rem;
      outline: none;
      border: 1px solid #efefef;
    }

    &-box {
      width: 1.8rem;
      height: 1.8rem;
      position: absolute;
      right: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
    }

    & button {
      background: unset;
      border: none;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      color: #8a98ac;
      font-weight: 600;
      font-size: 1.5rem;

      & span {
        width: 2.2rem;
        height: 0.4rem;
        background: #365ba7;
      }
    }
  }

  &-lineHeight {
    background: #efefef;
    width: 6.4rem;
    height: 4rem;
    position: relative;

    & > .element-lineHeight {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    &-dropdown {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: max-content;
    }

    & input {
      max-width: 13rem;
      padding: 0.5rem;
      outline: none;
      border: 1px solid #efefef;
    }

    &-box {
      width: 1.8rem;
      height: 1.8rem;
      position: absolute;
      right: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
    }

    & button {
      background: unset;
      border: none;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      color: #8a98ac;
      font-weight: 600;
      font-size: 1.5rem;

      & span {
        width: 2.2rem;
        height: 0.4rem;
        background: #365ba7;
      }
    }
  }

  &-styler {
    display: flex;
    background: #efefef;
    align-items: center;
    cursor: not-allowed;

    &-bold {
      display: flex;
      gap: 0.8rem;
      align-items: center;
    }

    &-positions {
      width: 1.5rem;
      height: 1.5rem;
    }

    & button {
      font-size: 1.6rem;
      background: unset;
      border: none;
      color: #8a98ac;
      width: 4.2rem;
      height: 4.2rem;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        cursor: not-allowed;
        pointer-events: none;
      }
    }
  }
}
</style>
