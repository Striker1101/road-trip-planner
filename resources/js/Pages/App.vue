<template>
    <nav class="bg-blue-600 p-4 shadow-lg">
        <div class="container mx-auto flex justify-between items-center">
            <div class="text-white text-lg font-bold">Road Trip Planner</div>
            <div class="space-x-4">
                <router-link
                    to="/"
                    class="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
                    active-class="bg-blue-700"
                >
                    Home
                </router-link>
                <router-link
                    to="/list"
                    class="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
                    active-class="bg-blue-700"
                >
                    List
                </router-link>
                <router-link
                    to="/path_way"
                    class="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
                    active-class="bg-blue-700"
                >
                    Pathway
                </router-link>
            </div>
        </div>
    </nav>
    <router-view></router-view>

    <footer></footer>
</template>

<script>
export default {
    name: "App",
};
</script>
