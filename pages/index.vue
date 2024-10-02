<template>
    <div class="dash">
        <div class="dash-header">
            <h2 class="dash-heading">Статистика</h2>
            <div class="dash-header-buttons">
                <div class="dash-header-button-dates" ref="dates">
                    <button class="dash-header-button-date" data-filter="today" @click="onTap($event)">За день</button>
                    <button class="dash-header-button-date" data-filter="month" @click="onTap($event)">За месяц</button>
                    <button class="dash-header-button-date active" data-filter="year" @click="onTap($event)">За
                        год</button>
                    <!-- <div class="dash-header-calendar">
                        <ModelsUiDatePicker />
                    </div> -->
                </div>
                <div class="dash-header-devices">
                    <div class="dash-header-devices">
                        <span class="dash-header-device-icon"
                            :class="$router.currentRoute.value.query.devices && $router.currentRoute.value.query.devices === 'PC' ? 'active' : ''"
                            @click="filterDevice('PC')" v-html="laptop"></span>
                        <span class="dash-header-device-icon"
                            :class="$router.currentRoute.value.query.devices && $router.currentRoute.value.query.devices === 'Mobile' ? 'active' : ''"
                            @click="filterDevice('Mobile')" v-html="phone"></span>
                    </div>
                </div>
            </div>
        </div>
        <Dashboard />
    </div>
</template>


<script lang="ts" setup>
import Dashboard from '~/components/Collector/Dashboard.vue';

import laptop from '@/assets/laptop.svg?raw';
import phone from '@/assets/phone.svg?raw'
import { setActivityMiddleware } from '~/middleware/history.activity';

const loaded = ref(false);
const dates = ref();

const $router = useRouter();

const filterDevice = (string: string) => {
    $router.push({ query: { filter: $router.currentRoute.value.query.filter, devices: string } })
    setTimeout(() => {
        location.reload();
    }, 1000);
}

const onTap = (event: any) => {
    const elements = document.querySelectorAll(".dash-header-button-date");

    elements.forEach((element: any) => {
        (element as HTMLButtonElement).classList.remove("active");
    });

    const attribute = event.target.getAttribute('data-filter');

    if (attribute) {
        $router.push({ query: { filter: attribute, devices: $router.currentRoute.value.query.devices } })
        setTimeout(() => {
            location.reload();
        }, 1000);
    }
}

const activate = () => {
    const elements = document.querySelectorAll(".dash-header-button-date");

    elements.forEach((element: any) => {
        if (element.getAttribute("data-filter") === $router.currentRoute.value.query.filter) {
            element.classList.add("active");
        } else {
            element.classList.remove("active");
        }
    });

    setActivityMiddleware("Вход в Дашбоард", "dashboard")
}

onMounted(async () => {
    await activate();
    loaded.value = await true;
})

</script>

<style scoped lang="scss">
.dash,
.dash-blocks {
    width: 100%;
}

.dash {
    &-header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &-calendar {
            width: 4rem;
            height: 4rem;
        }

        &-button {

            &-dates {
                display: flex;
                align-items: center;

                &>button {
                    color: black;
                    width: max-content;
                    padding: 1rem 2rem;
                    border: .05rem solid #E5E5E5;
                    background: white;

                    &.active {
                        background-color: #F1F9FE;
                        color: #0054FF;
                    }
                }
            }
        }

        &-buttons {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 2.4rem;
        }

        &-devices {
            display: flex;
            align-items: center;
            justify-content: space-between;

            &>span {
                width: 4rem;
                height: 4rem;
                display: flex;
                align-items: center;
                justify-content: center;
                border: .05rem solid #e5e5e5;
                border-radius: .4rem;
                background: white;
                cursor: pointer;

                &.active {
                    background: #F1F9FE;

                    & * {
                        fill: #0054FF;
                    }
                }

                &:last-of-type {
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                }

                &:first-of-type {
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                }
            }
        }
    }

    &-blocks {
        margin-top: 3.2rem;
        display: flex;
        justify-content: space-between;
    }

    &-block {
        width: 100%;
        max-width: calc((100% / 4) - 1.2rem);
    }

    &-heading {
        font-size: 3.2rem;
        line-height: 3.6rem;
        font-weight: 500;
        width: 100%;
    }
}
</style>