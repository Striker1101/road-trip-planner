import { createApp } from "vue";
import App from "./Pages/App.vue";
import store from "./store";
import router from "./router"; // Import the router
import "./bootstrap";

createApp(App)
    .use(store)
    .use(router) // Use the router
    .mount("#app");
