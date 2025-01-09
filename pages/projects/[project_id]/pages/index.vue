<script lang="ts" setup>
import ProjectPages from '~/components/cards/projects/pages.vue';

const modalPage = ref(false);

definePageMeta({
    layout: "pages",
})

const toggleModalPage = () => {
    modalPage.value = !modalPage.value;
}

</script>

<template>
    <section class="project-section">
        <div class="project-section-container">
            <header class="project-section-header">
                <h1>Все страницы</h1>
                <ul class="project-section-list">
                    <li class="project-section-item">
                        <button @click="toggleModalPage" class="project-section-button" data-event="publish">
                            Создать страницу
                        </button>
                    </li>
                </ul>
            </header>
            <main class="project-section-content">
                <project-pages />
            </main>
        </div>
    </section>

    <ui-modals-pages :class="modalPage ? 'active' : ''" @close="toggleModalPage" @self="toggleModalPage"/>
</template>

<style lang="scss" scoped>
.project {
    &-section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;

        &-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: column;
            max-width: 144rem;
            width: 100%;
            padding: 1.5rem;
            margin: 0 auto;

            &>* {
                width: 100%;
            }
        }

        &-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &-list {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1.2rem;
        }

        &-button {
            color: white;
            background: #4773ff;
            padding: .75rem 1rem;
            border-radius: 10rem;
        }
    }
}
</style>
