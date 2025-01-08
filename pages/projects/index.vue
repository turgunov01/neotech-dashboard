<script lang="ts" setup>
import ProjectList from '~/components/cards/projects/list.vue';

definePageMeta({
    layout: "projects",
})
</script>

<template>
    <section class="project-section">
        <div class="project-section-container">
            <header class="project-section-header">
                <h1>Все сайты</h1>
                <ul class="project-section-list">
                    <li class="project-section-item">
                        <button class="project-section-button" data-event="publish">Создать сайт</button>
                    </li>
                </ul>
            </header>
            <main class="project-section-content">
                <project-list />
            </main>
        </div>
    </section>
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
