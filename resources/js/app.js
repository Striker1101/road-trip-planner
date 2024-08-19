import { createApp } from "vue";
import App from "./Pages/App.vue";
import store from "./store";
import router from "./router";
import "../css/app.css";
import "./bootstrap";

window.initializeGoogleMaps = function () {
    // You can set a flag here or directly handle the Google Maps API loading
    window.googleMapsLoaded = true;
};

const app = createApp(App);

app.use(store);
app.use(router);

app.mount("#app");
