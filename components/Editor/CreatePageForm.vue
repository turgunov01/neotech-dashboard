<template>
    <div class="form-wrapper" @click.self="$emit('close')">
        <div class="form-container">
            <h4 class="form-create">Новая страница</h4>
            <label for="name">
                <p class="form-create-title">Имя</p>
                <input type="text" id="name" v-model="name" placeholder="Название страницы">
            </label>
            <button class="create-page submit" @click="createPage(), $emit('close')">Создать</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { USER_FETCH_HOST } from '~/composables/Editor/exports/app';
import apiDataFetch from '~/composables/Editor/exports/fetch';
import { FailedAlert, PushNotification } from '~/composables/Notification/list';

const emits = defineEmits(['close']);

const name = ref("");
const $router = useRouter().currentRoute.value;

const createPage = async () => {
    const params = {
        url: $router.query.url,
        page_id: $router.query.page_id,
    }

    if (name.value.length === 0) return FailedAlert(`Name is required!`);

    const methods = {
        get: {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("Authorization")}`
            }
        },
        post: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Authorization")}`
            },
            body: JSON.stringify({
                name: name.value,
                html: "starter",
                css: "*{margin:0;padding:0;box-sizing:border-box;}",
                sections: []
            })
        }
    }

    await apiDataFetch(USER_FETCH_HOST + `/constructor/projects?url=${params.url}`, methods.get)
        .then(response => response.json())
        .then(async response => {
            const data = response.project;

            if (response.error) return FailedAlert(response.error)

            await apiDataFetch(USER_FETCH_HOST + `/constructor/projects/${data.project_id}/create/page`, { ...methods.post })
                .then(response => response.json())
                .then(response => {
                    const data = response;

                    if (data.error) return FailedAlert(data.error);
                    name.value = "";

                    return PushNotification(data.message);
                })
        })
}

</script>

<style lang="scss" scoped>
.create {
    &-page {
        background: #365BA7;
        color: white;
        height: 3.8rem;
        width: max-content;
        border-radius: .8rem;
        padding: 0 1.4rem;

        &.submit {
            border-radius: .4rem;
            margin-top: 2.4rem;
            width: 100%;
        }

        &.delete {
            background: red
        }
    }
}

.form {
    &-wrapper {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.2);
        z-index: 9999;
        align-items: center;
        justify-content: center;
        display: none;

        &.active {
            display: flex;
        }
    }



    &-container {
        width: 100%;
        max-width: 40rem;
        height: max-content;
        display: flex;
        flex-direction: column;
        background: white;
        border-radius: .8rem;
        padding: 2.4rem;

        &>label {
            margin-top: 1.2rem;
            width: 100%;
            display: flex;
            flex-direction: column;
            row-gap: .4rem;

            & p {
                font-size: 1.4rem;
                color: #dcdada !important;
            }

            & input {
                width: 100%;
                height: 100%;
                color: black !important;
                background: white !important;
                border: .1rem solid #dcdada !important;
                padding: .6rem 1.2rem;
            }
        }
    }

    &-create {
        font-size: 2.4rem;
        font-weight: 500;
        line-height: 1.5;
        text-align: center;
    }
}
</style>
