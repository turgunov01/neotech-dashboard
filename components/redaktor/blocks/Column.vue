<template>
    <div class="columns" id="3">
        <div class="column">
            <img src="" alt="Image">
            <h2>Профессионализм</h2>
            <p>
                Мы постоянно обучаемся и следим
                за последними тенденциями в сфере IT,
                чтобы быть на передовой.
            </p>
        </div>
    </div>
</template>
<script>
export default {
    data: () => {
        return {
            index: 3,
        }
    },
    methods: {
        countWidth() {
            const columns = document.querySelector(".columns")
            const children = columns.children
            const id = columns.id

            for (let i = 0; i < children.length; i++) {
                if (id == 3) {
                    switch (i) {
                        case 0:
                            children[i].classList.add("right")
                            children[i].classList.add("bottom")
                            break;
                        case 1:
                            children[i].classList.add("right")
                            children[i].classList.add("bottom")
                            break;
                        case 2:
                            children[i].classList.add("bottom")
                            break;
                        case 3:
                            children[i].classList.add("right")
                            children[i].classList.add("bottom")
                            break;
                        case 4:
                            children[i].classList.add("right")
                            children[i].classList.add("bottom")
                            break;
                        case 5:
                            children[i].classList.add("bottom")
                            break;
                    }

                    children[i].style.maxWidth = `calc(100% / ${id})`
                }
            }
        }
    },
    mounted() {
        switch (screen.width) {
            case screen.width > 1140:
                this.index = 3;
                break;
            case screen.width < 768:
                this.index = 2
        }

        this.countWidth()
    }
}
</script>
<style lang="css" scoped>
.columns {
    display: flex;
    flex-wrap: wrap;
}

.column {
    width: 100%;
    padding: 5rem 3.6rem;
}

.column h2 {
    font-size: 2.2rem;
    color: var(--color);
    font-weight: 700;
    line-height: 120%;
    margin-top: 5rem;
}

.column p {
    font-size: 1.7rem;
    color: var(--color);
    font-weight: 400;
    line-height: 135%;
    letter-spacing: 1%;
    opacity: 0.6;
    margin-top: 1rem;
}

.column img {
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.column.top {
    border-top: .1rem dashed var(--border);
}

.column.left {
    border-left: .1rem dashed var(--border);
}

.column.right {
    border-right: .1rem dashed var(--border);
}

.column.bottom {
    border-bottom: .1rem dashed var(--border);
}
</style>