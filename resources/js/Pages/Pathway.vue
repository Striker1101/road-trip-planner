<template>
    <div class="text-center">
        <h1 class="text-3xl font-bold underline">Pathway</h1>
        <div id="map" style="height: 400px; width: 100%"></div>
        <div id="directions-panel" class="directions-panel"></div>
    </div>
</template>

<script>
export default {
    name: "Pathway",
    props: {
        directions: Object, // Accept the directions data as a prop
    },
    mounted() {
        this.initMap();
    },
    methods: {
        initMap() {
            const map = new google.maps.Map(document.getElementById("map"), {
                center: this.directions.routes[0].legs[0].start_location,
                zoom: 7,
            });

            const directionsRenderer = new google.maps.DirectionsRenderer();
            directionsRenderer.setMap(map);
            directionsRenderer.setDirections(this.directions);

            const route = this.directions.routes[0];
            const summaryPanel = document.getElementById("directions-panel");
            summaryPanel.innerHTML = "";

            for (let i = 0; i < route.legs.length; i++) {
                const leg = route.legs[i];
                summaryPanel.innerHTML += `<b>Route Segment: ${i + 1}</b><br>`;
                summaryPanel.innerHTML += `${leg.start_address} to `;
                summaryPanel.innerHTML += `${leg.end_address}<br>`;
                summaryPanel.innerHTML += `${leg.distance.text} in `;
                summaryPanel.innerHTML += `${leg.duration.text}<br><br>`;
            }
        },
    },
};
</script>

<style scoped>
#map {
    height: 100%;
    width: 100%;
}

.directions-panel {
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
}
</style>
