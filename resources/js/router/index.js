import { createRouter, createWebHistory } from "vue-router";
import Index from "../Pages/Index.vue";
import List from "../Pages/List.vue";
import Pathway from "../Pages/Pathway.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Index,
    },
    {
        path: "/list",
        name: "List",
        component: List,
    },
    {
        path: "/path_way",
        name: "Pathway",
        component: Pathway,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
