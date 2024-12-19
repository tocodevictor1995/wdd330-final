class MapService {
    constructor() {
        this.map = null;
    }

    initMap(lat, lng) {
        const mapOptions = {
            center: { lat, lng },
            zoom: 14
        };

        const mapDiv = document.getElementById('map');
        this.map = new google.maps.Map(mapDiv, mapOptions);
    }

    addMarker(lat, lng, title) {
        new google.maps.Marker({
            position: { lat, lng },
            map: this.map,
            title: title
        });
    }
}
