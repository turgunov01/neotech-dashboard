<template>
    <div class="layers">
        <div class="layers-container">
            <div class="layers-title">Блоки</div>
            <div class="layers-list">
                <div class="layers-item active">
                    <button class="layers-button active">Блок 1</button>
                </div>
                <div class="layers-item">
                    <button class="layers-button">Блок 2</button>
                </div>
                <div class="layers-item">
                    <button class="layers-button">Блок 3</button>
                </div>
                <div class="layers-item">
                    <button class="layers-button">Блок 4</button>
                </div>
                <div class="layers-item">
                    <button class="layers-button">Блок 5</button>
                </div>
                <div class="layers-item">
                    <button class="layers-button">Блок 6</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
$active: #0054FF;
$active-background: #E3F2FD;

.layers {
    &-container {
        width: 25rem;
        border-radius: .4rem;
        border: .1rem solid #e5e5e5;
    }

    &-title {
        font-size: 2rem;
        line-height: 120%;
        font-weight: 500;
        color: #000000;
        padding: 2.4rem;
        padding-bottom: 1.6rem;
        border-bottom: .1rem solid #e5e5e5;
    }

    &-list {
        padding: 1.6rem 1.4rem;
    }

    &-item {
        padding: 1rem;
        border-radius: .4rem;
        cursor: pointer;
        &.active {
            background: $active-background;
        }
    }

    &-button {
        border: unset;
        font-size: 1.5rem;
        line-height: 125%;
        background-color: unset;

        &.active {
            color: $active;
        }
    }
}
</style>