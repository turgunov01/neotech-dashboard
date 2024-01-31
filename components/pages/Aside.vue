<template>
    <aside class="aside" @mouseleave="elements.aside.opened = false; elements.aside.avail = false">
        <div class="aside-container" :style="{
            'width': elements.aside.opened ? '72rem' : '30rem'
        }">
            <div class="aside-header">
                <img src="../../src/assets/images/logo-square.svg" alt="">
                <p class="aside-header-name">Редактировать блок {{ elements.aside.opened ? ` - ${elements.selected}` : "" }}
                </p>
            </div>
            <div class="aside-wrapper">
                <div class="aside-body" :style="{
                    'border-right': elements.aside ? '.1rem solid #e5e5e5' : 'unset'
                }">
                    <div class="aside-item func active" @click="type($event)">
                        <span>Обложка</span>
                    </div>
                    <div class="aside-item func" @click="type($event)">
                        <span>О проекте</span>
                    </div>
                    <div class="aside-item func" @click="type($event)">
                        <span>Заголовок</span>
                    </div>
                    <div class="aside-item func" @click="type($event)">
                        <span>Текстовый блок</span>
                    </div>
                    <div class="aside-item func" @click="type($event)">
                        <span>Изображение
                        </span>
                    </div>
                    <div class="aside-item func" @click="type($event)">
                        <span>Галерея</span>
                    </div>
                    <div class="aside-item func" @click="type($event)">
                        <span>Форма</span>
                    </div>
                    <div class="aside-item func" @click="type($event)">
                        <span>Кнопка</span>
                    </div>
                    <div class="aside-item func" @click="type($event)">
                        <span>Преимущества</span>
                    </div>
                    <div class="aside-item func" @click="type($event)">
                        <span>Колонки</span>
                    </div>
                    <div class="aside-item func" @click="type($event)">
                        <span>Меню</span>
                    </div>
                    <div class="aside-item func" @click="type($event)">
                        <span>Магазин</span>
                    </div>
                    <div class="aside-item" @click="type($event)">
                        <span>Разделитель</span>
                    </div>
                    <div class="aside-item" @click="type($event)">
                        <span>Список страниц</span>
                    </div>
                    <div class="aside-item" @click="type($event)">
                        <span>Плитка и ссылка</span>
                    </div>
                    <div class="aside-item" @click="type($event)">
                        <span>Подвал</span>
                    </div>
                    <div class="aside-item" @click="type($event)">
                        <span>Видео</span>
                    </div>
                    <div class="aside-item" @click="type($event)">
                        <span>Команда</span>
                    </div>
                    <div class="aside-item" @click="type($event)">
                        <span>Отзывы</span>
                    </div>
                    <div class="aside-item" @click="type($event)">
                        <span>Расписание</span>
                    </div>
                    <div class="aside-item" @click="type($event)">
                        <span>Этапы</span>
                    </div>
                    <div class="aside-item" @click="type($event)">
                        <span>Контакты</span>
                    </div>
                    <div class="aside-item" @click="type($event)">
                        <span>Услуги</span>
                    </div>
                    <div class="aside-item" @click="type($event)">
                        <span>Соц.сети</span>
                    </div>
                    <div class="aside-item" @click="type($event)">
                        <span>Тарифы</span>
                    </div>
                    <div class="aside-item" @click="type($event)">
                        <span>Партнеры</span>
                    </div>
                    <div class="aside-item" @click="type($event)">
                        <span>Новости и потоки</span>
                    </div>
                    <div class="aside-item" @click="type($event)">
                        <span>Другое</span>
                    </div>
                </div>
                <aside class="current-items" v-if="elements.aside.opened && elements.aside.id === 1">
                    {{ elements.aside.id }}
                    <div class="current-item" id="1">
                        <img src="../../src/assets/images/test/test-cover.jpg" @click="$emit('changeCoverComponent', 1)" alt="">
                    </div>
                    <div class=" current-item" id="2">
                        <img src="../../src/assets/images/test/test-cover.jpg" @click="$emit('changeCoverComponent', 2)" alt="">
                    </div>
                    <div class=" current-item" id="3">
                        <img src="../../src/assets/images/test/test-cover.jpg" @click="$emit('changeCoverComponent', 3)" alt="">
                    </div>
                </aside>
                <aside class="current-items" v-if="elements.aside.opened && elements.aside.id === 2">
                    {{ elements.aside.id }}
                    <div class="current-item" id="1">
                        <img src="../../src/assets/images/test/test-cover.jpg" @click="$emit('changeCoverComponent', 1)" alt="">
                    </div>
                    <div class=" current-item" id="2">
                        <img src="../../src/assets/images/test/test-cover.jpg" @click="$emit('changeCoverComponent', 2)" alt="">
                    </div>
                    <div class=" current-item" id="3">
                        <img src="../../src/assets/images/test/test-cover.jpg" @click="$emit('changeCoverComponent', 3)" alt="">
                    </div>
                </aside>
            </div>
        </div>
    </aside>
</template>
<script setup lang="ts">
const props = defineProps({
    elements: {
        required: true,
        type: Object
    }
})

const emits = defineEmits([
    'changeCoverComponent'
])

const type = (e: any) => {
    const target = e.target
    const html = e.target.innerText

    props.elements.selected = html

    const items = document.querySelectorAll(".aside-item")

    items.forEach((item: any, index: number) => {
        item.classList.remove('active')

        if (item === e.target) {
            props.elements.aside.id = index + 1
        }
    })

    target.classList.add('active')
    props.elements.aside.opened = true
}

</script>
<style lang="scss" scoped>
.aside {
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    overflow: hidden;
    height: 100vh;
    background: white;
    box-shadow: .4rem 0 .4rem .1rem rgba(0, 0, 0, 0.1);

    &-container {
        overflow: scroll;
        height: 100%;
        padding-bottom: 3rem;
    }

    &-wrapper {
        display: flex;
    }

    &-header {
        width: 100%;
        height: 100%;
        max-height: 6rem;
        padding: 1.5rem;
        display: flex;
        align-items: center;
        gap: .5rem;
        border-bottom: .1rem solid #e5e5e5;

        & img {
            width: 3rem;
            height: 3rem;
        }

        & p {
            font-size: 1.6rem;
            line-height: 120%;
            font-weight: 500;
        }
    }

    &-body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 30rem !important;
        border-right: .1rem solid #e5e5e5;
    }

    & .current {
        &-items {
            padding: 1rem;
            display: flex;
            flex-direction: column;
            row-gap: 1rem;
        }

        &-item {
            width: 40rem;
            height: 20rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border: .2rem dashed rgb(173, 206, 249);
            border-radius: .6rem;
            transition: .2s;
            cursor: pointer;

            &:hover {
                border: .2rem solid rgb(173, 206, 249);
            }

            & img {
                object-fit: cover;
                width: 100%;
                height: auto;
            }
        }
    }

    &-item {
        padding: 1.2rem 1.5rem;
        font-size: 1.8rem;
        line-height: 120%;
        font-weight: 300;
        transition: .3s;
        cursor: pointer;
        border-right: .7rem solid rgb(54, 91, 167, 0);
        border-bottom: .1rem solid #e5e5e5;

        &.func {
            font-weight: 600;
        }

        &.active {
            border-right: .7rem solid rgb(54, 91, 167);
            color: rgb(54, 91, 167);
        }

        &:hover {
            border-right: .7rem solid rgb(54, 91, 167);
            color: rgb(54, 91, 167);
        }
    }
}
</style>