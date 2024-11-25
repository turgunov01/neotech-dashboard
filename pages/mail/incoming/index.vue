<template>
    <div class="mail">
        <div class="mail-container">
            <aside class="mail-sidebar">
            </aside>
        </div>
    </div>
</template>

<script lang="ts" setup>

onMounted(async () => {
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
            Accept: "application/json",
        }
    }

    await apiDataFetch(`${USER_FETCH_HOST}/messages/all`, options)
        .then(response => response.json())
        .then(response => {

            if (response.messages.length === 0) {
                FailedAlert("No messages were found!");
                setTimeout(() => {
                    useRouter().push("/")
                    location.reload();
                }, 3000);
            } else {
                useRouter().push("/mail/incoming/1")
            }



        })
})


</script>

<style scoped lang="scss"></style>