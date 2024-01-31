<template>
    <div style="
    position: relative;
    margin-top: 0; height: 100%;
    display: flex; flex-wrap: wrap;
    width: 100%; font-family: 'Wix MadeFor Display';">
        <div style="border-top: 1px dashed #adcef9;
        border-bottom: 1px dashed #adcef9; width: 100%;">
            <h1 style="color: #365ba7;
            font-size: 6.2rem;
            font-weight: 500;
            padding: .6rem;
            letter-spacing: -.3rem;
            line-height: 6.8rem;
            max-width: 111.8rem;
            margin-left: auto;
            text-align: end;
            width: 100%;
             
        ">
                {{ prop.title }}
            </h1>
        </div>
        <div style="border-right: 1px dashed #adcef9;
        height: 100%;
        border-bottom: 1px dashed #adcef9;
        margin-right: auto;
        padding: 1.6rem;
        position: relative;
        width: 50%;">
            <p style="color: #365ba7; font-size: 1.6rem;">
                {{ prop.subtitle }}
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">

const props = defineProps({
    prop: {
        required: true,
        type: Object,
        default: {
            title: "Мы реализуем идеи создания инновационных продуктов и решений, которые меняют мир",
            subtitle: "Профессиональная команда с мировым опытом в IT-разработке, которая ценит индивидуальность, ответственность и взаимный рост, стремясь к лучшим результатам. "
        }
    }
})

</script>
<style lang="">
    
</style>