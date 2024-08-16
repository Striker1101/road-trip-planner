<template>
    <div class="container">
        <div class="mt-10 flex justify-center">
            <form v-if="!showMap">
                <div class="sm:col-span-4">
                    <label
                        for="username"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Search</label
                    >
                    <div class="mt-2">
                        <div
                            class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                        >
                            <span
                                class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"
                                >Location :</span
                            >
                            <input
                                type="search"
                                name="search"
                                id="search"
                                autocomplete="search"
                                class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Delta State"
                            />
                        </div>
                    </div>
                </div>
                <div class="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="button"
                        @click="toggleMap"
                        class="text-sm font-semibold leading-6 text-gray-900"
                    >
                        Use Map
                    </button>
                    <button
                        type="submit"
                        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Go
                    </button>
                </div>
            </form>

            <div v-else id="map" style="height: 400px; width: 600px"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showMap: false, // Track whether to show the map
        };
    },
    methods: {
        toggleMap() {
            this.showMap = !this.showMap; // Toggle map visibility
            if (this.showMap) {
                this.initMap(); // Initialize the map if it's being shown
            }
        },
        initMap() {
            const map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
            });

            // Add a marker on map click
            map.addListener("click", (e) => {
                new google.maps.Marker({
                    position: e.latLng,
                    map: map,
                });
            });
        },
    },
};
</script>

<style scoped>
/* Scoped styles for this component */
</style>
