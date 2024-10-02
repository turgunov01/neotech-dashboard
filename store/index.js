export const state = () => ({
    loading: 0, // Number of active fetch requests
});

export const mutations = {
    incrementLoading(state) {
        state.loading++;
    },
    decrementLoading(state) {
        state.loading--;
    },
};