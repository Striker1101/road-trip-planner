<template>
    <div class="container flex-col flex justify-center align-middle">
        <div class="col" id="map" style="height: 400px; width: 100%"></div>

        <div class="col flex items-center justify-center mt-7">
            <button
                type="button"
                @click="toggleSearch"
                class="text-sm font-semibold leading-6 text-gray-900 mr-4"
            >
                Use Search
            </button>
            <button
                type="button"
                @click="selectCurrentLocation"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
                Go
            </button>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.initMap();
    },
    data() {
        return {
            selectedLocation: null,
            marker: null, // Store the marker
        };
    },
    methods: {
        initMap() {
            const map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: -34.397, lng: 150.644 }, // Default center
                zoom: 10,
            });

            // Add a marker on map click
            map.addListener("click", (e) => {
                this.selectedLocation = e.latLng;

                // Remove the previous marker if it exists
                if (this.marker) {
                    this.marker.setMap(null);
                }

                // Place a new marker on the clicked location
                this.marker = new google.maps.Marker({
                    position: e.latLng,
                    map: map,
                });
            });
        },
        selectCurrentLocation() {
            if (this.marker) {
                this.$emit("locationSelected", {
                    lat: this.marker.position.lat(),
                    lng: this.marker.position.lng(),
                });
            } else {
                console.log("not choice");
            }
        },
        toggleSearch() {
            this.$emit("toggleMap");
        },
    },
};
</script>

<style scoped>
#map {
    height: 100%;
    width: 100%;
}
</style>
