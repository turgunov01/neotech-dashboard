<template>
    <div class="loader loader--style3" title="2" :style="{
        height: height,
        borderRadius: curved ? curved : '0',
        background: hasBackground ? '#fff' : 'unset'
    }">
        <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;"
            xml:space="preserve">
            <path fill="rgb(59 130 246)"
                d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25"
                    to="360 25 25" dur="0.6s" repeatCount="indefinite" />
            </path>
        </svg>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps({
    height: {
        required: true,
        type: String,
    },
    curved: {
        type: String
    },
    hasBackground: {
        type: Boolean,
    }
})

</script>

<style lang="scss" scoped>
.loader {
    margin: 0 0 2em;
    text-align: center;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}
</style>