<template>
    <div class="listing-cards">
        <nuxt-link to="/pages/1" class="listing-card" v-for="page in pages">
            <div class="listing-card-info">
                <div class="listing-card-icon">
                    <div class="listing-card-block" v-if="!page.url"></div>
                    <div class="listing-card-cover" v-else>
                        <img src="../../src/assets/images/bold.svg" class="listing-card-cover-image" alt="">
                    </div>
                </div>
                <p class="listing-card-title">
                    {{ page.name }}
                </p>
            </div>
            <div class="listing-card-events">
                <div class="listing-card-event">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="14px">
                        <path
                            d="M25.72 15.27l1.33-1a2.47 2.47 0 00-.75-4.29l-1.6-.51a1.72 1.72 0 01-1.15-2l.37-1.66A2.43 2.43 0 0020.62 3l-1.55.65a1.68 1.68 0 01-2.15-.79l-.77-1.51a2.41 2.41 0 00-4.3 0l-.77 1.51a1.68 1.68 0 01-2.15.79L7.38 3a2.43 2.43 0 00-3.3 2.8l.37 1.66a1.72 1.72 0 01-1.15 2l-1.6.51a2.47 2.47 0 00-.7 4.27l1.33 1a1.73 1.73 0 01.4 2.29L1.78 19a2.45 2.45 0 002.15 3.77l1.67-.08a1.7 1.7 0 011.76 1.49l.22 1.68a2.42 2.42 0 004 1.49l1.23-1.15a1.68 1.68 0 012.29 0l1.23 1.15a2.42 2.42 0 004-1.49l.22-1.68a1.7 1.7 0 011.76-1.49l1.67.08A2.45 2.45 0 0026.22 19l-.9-1.43a1.73 1.73 0 01.4-2.3zM14 20.77A6.77 6.77 0 1120.77 14 6.77 6.77 0 0114 20.77z">
                        </path>
                    </svg>
                    <p class="listing-card-event-name">Настройки</p>
                </div>
                <div class="listing-card-event">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.6 25.8" width="14px">
                        <path
                            d="M21 6C19.8 1.7 15.4-.8 11.2.4 8.4 1.1 6.3 3.3 5.6 6 1.4 7.4-.9 11.9.5 16.1c1.1 3.3 4.1 5.5 7.5 5.5v-3c-2.8-.2-4.9-2.5-4.7-5.3.1-2.2 1.7-4.1 3.9-4.6l1.1-.2.1-1.1c.4-2.7 3-4.6 5.7-4.1 2.1.3 3.8 2 4.1 4.1l.1 1.1 1.1.2c2.7.6 4.4 3.3 3.7 6-.5 2.2-2.4 3.7-4.6 3.9v3c4.4-.1 7.9-3.7 7.9-8.1.1-3.4-2.2-6.4-5.4-7.5z">
                        </path>
                        <path d="M19.8 13.4l-6.5-6.5-6.5 6.5 2.1 2.2 2.9-2.9v13.1h3V12.7l2.8 2.9z"></path>
                    </svg>
                    <p class="listing-card-event-name">Опубликовать</p>
                </div>
                <div class="listing-card-event delete">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="14px" height="14px">
                        <g>
                            <path d="M16.06 2.89V1.11H12v1.78H4.11v4.19h20.07V2.89zM6.11 26.89h16.07l2-16.81H4.11z"></path>
                        </g>
                    </svg>
                    <p class="listing-card-event-name">Удалить</p>
                </div>
            </div>
        </nuxt-link>
    </div>
</template>
<script lang="ts" setup>

const pages = ref([
    {
        name: "first",
        id: 1,
        required: true,
    },
    {
        name: "second",
        id: 2,
        required: true,
    },
    {
        name: "third",
        id: 1,
        required: true,
    },
])
const list = async () => {
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${await checkToken()}`
        }
    }

    // const data = await listing()
    // data.forEach(item => pages.value.push(item))
}

</script>
<style lang="scss" scoped>
.listing {
    &-cards {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        row-gap: 1.5rem;
    }

    &-card {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(0, 0, 0, 0.01);
        border: .1rem solid #e5e5e5;
        padding: 3rem 2rem;
        cursor: pointer;
        color: #000;

        &-info {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 3rem;
        }

        &-title {
            font-size: 3rem;
            line-height: 120%;
            text-transform: capitalize;
        }

        &:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }

        &:hover &-events {
            display: flex;
        }

        &:hover &-title {
            color: #365BA7;
        }

        &:hover &-block {
            background-color: #365BA7;
        }

        &-block {
            width: 7rem;
            height: 7rem;
            background: #000;
            border-radius: 50%;
        }

        &-events {
            display: none;
            align-items: center;
            gap: 2rem;
        }

        &-event {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: .5rem;
            opacity: 0.5;
            cursor: pointer;

            &:hover {
                opacity: 1;
            }

            &.delete {
                opacity: 0.5;

                &:hover {
                    color: #ff0000;
                    opacity: 1;
                }
            }
        }

    }
}
</style>