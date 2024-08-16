import { createStore } from "vuex";

export default createStore({
    state() {
        return {
            destinations: [], // Example state to manage destinations
        };
    },
    mutations: {
        addDestination(state, destination) {
            state.destinations.push(destination);
        },
        removeDestination(state, index) {
            state.destinations.splice(index, 1);
        },
        updateDestination(state, { index, newDestination }) {
            state.destinations[index] = newDestination;
        },
    },
    actions: {
        addDestination({ commit }, destination) {
            commit("addDestination", destination);
        },
        removeDestination({ commit }, index) {
            commit("removeDestination", index);
        },
        updateDestination({ commit }, payload) {
            commit("updateDestination", payload);
        },
    },
    getters: {
        getDestinations(state) {
            return state.destinations;
        },
    },
});
