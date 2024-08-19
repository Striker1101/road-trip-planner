<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Road Trip Planner</title>
    @vite('resources/css/app.css')
    <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCzBzDJOo73Uhid5YI0elsFrWo_Ma4ANMk&libraries=places&callback=initializeGoogleMaps"
        async defer></script>
</head>

<body>
    <div id="app"></div>
    @vite('resources/js/app.js')
</body>

</html>
