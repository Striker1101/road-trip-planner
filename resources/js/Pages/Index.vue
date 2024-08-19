<template>
    <div class="container mx-auto p-6">
        <div class="flex justify-center">
            <div class="w-full max-w-md">
                <!-- Form to input or display current location -->
                <div v-if="!currentLocationAvailable">
                    <div class="mb-4">
                        <label
                            for="current-location"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Enter Your Current Location
                        </label>
                        <input
                            v-model="manualCurrentLocation"
                            type="text"
                            id="current-location"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your current location"
                        />
                    </div>
                </div>

                <!-- Form to input final location or use Google Maps -->
                <div class="mb-4">
                    <label
                        for="final-location"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Final Location (Input or Use Map)
                    </label>
                    <div v-if="!showMap">
                        <input
                            v-model="finalLocation"
                            type="text"
                            id="final-location"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your final location"
                        />
                        <button
                            @click="toggleMap"
                            class="mt-2 text-sm text-indigo-600 hover:underline"
                        >
                            Use Map
                        </button>
                    </div>
                    <div v-else>
                        <GoogleMap
                            @locationSelected="handleLocationSelected"
                            @toggleMap="toggleMap"
                        />
                    </div>
                </div>

                <!-- Button to plan the trip -->
                <div class="mt-6">
                    <button
                        @click="getLocations"
                        class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Plan Trip
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GoogleMap from "./GoogleMap.vue";

export default {
    components: {
        GoogleMap,
    },
    data() {
        return {
            showMap: false,
            finalLocation: "",
            manualCurrentLocation: "",
            currentLocationAvailable: true,
        };
    },
    methods: {
        toggleMap() {
            this.showMap = !this.showMap;
        },
        async handleLocationSelected(location) {
            try {
                const currentLocation = await this.getCurrentLocation();
                this.finalLocation = `${location.lat}, ${location.lng}`;
                this.showMap = false;
                this.planTrip(currentLocation, location);
            } catch (error) {
                console.error("Failed to get current location:", error);
            }
        },

        async getLocations() {
            try {
                const currentLocation = await this.getCurrentLocation();
                this.planTrip(currentLocation, this.finalLocation);
            } catch (error) {
                console.error("Failed to get current location:", error);
            }
        },
        planTrip(current, destination) {
            console.log(current, destination);

            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer();

            // Initialize the map with DirectionsRenderer
            const map = new google.maps.Map(document.getElementById("map"), {
                center: current,
                zoom: 7,
            });
            directionsRenderer.setMap(map);

            // Define the directions request
            const request = {
                origin: current,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING, // You can change this to WALKING, BICYCLING, or TRANSIT
            };

            // Request the route from DirectionsService
            directionsService.route(request, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(result);
                    const route = result.routes[0];
                    const summaryPanel =
                        document.getElementById("directions-panel");
                    summaryPanel.innerHTML = "";

                    // For each route, display the distance and duration
                    for (let i = 0; i < route.legs.length; i++) {
                        const leg = route.legs[i];
                        summaryPanel.innerHTML += `<b>Route Segment: ${
                            i + 1
                        }</b><br>`;
                        summaryPanel.innerHTML += `${leg.start_address} to `;
                        summaryPanel.innerHTML += `${leg.end_address}<br>`;
                        summaryPanel.innerHTML += `${leg.distance.text} in `;
                        summaryPanel.innerHTML += `${leg.duration.text}<br><br>`;
                    }
                } else {
                    console.error("Directions request failed due to " + status);
                    alert("Could not retrieve directions. Please try again.");
                }
            });
        },

        getCurrentLocation() {
            return new Promise((resolve, reject) => {
                if (!this.currentLocationAvailable) {
                    resolve(this.manualCurrentLocation);
                } else if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            resolve({
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            });
                        },
                        (error) => {
                            console.error(
                                "Error getting location:",
                                error.message
                            );
                            this.currentLocationAvailable = false;
                            alert(
                                "Unable to retrieve your location. Please enter it manually."
                            );
                            reject(error);
                        }
                    );
                } else {
                    alert("Geolocation is not supported by your browser.");
                    this.currentLocationAvailable = false;
                    reject(
                        new Error(
                            "Geolocation is not supported by your browser."
                        )
                    );
                }
            });
        },
    },
};
</script>

<style scoped>
/* Scoped styles for this component */
</style>
