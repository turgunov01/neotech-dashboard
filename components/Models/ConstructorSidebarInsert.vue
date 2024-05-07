<template>
    <div class="insert">
        <div class="insert-cards" ref="cards">
            <div class="insert-card" draggable="true" :data-turn="`insert-card-${index}`" @mousedown="dragndrop(index)"
                v-for="(string, index) in blocks" :key="index">
                <div class="insert-card-image">
                    <img :src="`_nuxt/assets/constructor/inserts/insert-${index + 1}.png`" alt="">
                </div>
                <div class="insert-card-header">
                    <p class="insert-card-title">{{ string }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

const cards = ref(null)

const blocks = [
    'Навбар', 'Наши решения', 'Мы создаём', 'Нам доверяют', 'Наши преимущества', 'Напишите нам', 'Подвал'
]

const dragndrop = (index: Number) => {
    const selected = ref(null)

    function dragStart(e: DragEvent) {
        e.dataTransfer?.setData('text/plain', 'This text may be dragged');
    }

    function dragOver(e: DragEvent) {
        e.preventDefault()
    }

    if (cards.value && (cards.value as HTMLDivElement).children) {
        (selected.value as any) = (cards.value as HTMLDivElement).children.item(index as number);

        (selected.value as any).addEventListener('dragstart', dragStart);
        (selected.value as any).addEventListener('dragover', dragOver);

    }
}


</script>
