<script setup>
import Leaflet  from 'leaflet'
import { onMounted, ref } from 'vue';
import { UsemapStore } from '../../../stores/maps/map-store';
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";




const map = ref(null)
const mapstore = UsemapStore();
const {place:PlaceLocation , latitude:LatitudeLocation , longtitude:LongtitudeLocation } = mapstore.getCustomerLocationCoordinate();
const { place: PlaceDestination, longtitude: LogntitudeDestination, latitude:LatitudeDestination } = mapstore.getCustomerDestinationcoordinate();
onMounted(() => {
    map.value = Leaflet.map('map').setView([LatitudeLocation, LongtitudeLocation], 13);
    console.log([LatitudeDestination, LogntitudeDestination])
    Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map.value);

    Leaflet.marker([LatitudeLocation, LongtitudeLocation]).addTo(map.value)
        .bindPopup(PlaceLocation)
        .openPopup();
    Leaflet.marker([LatitudeDestination, LogntitudeDestination]).addTo(map.value)
        .bindPopup(PlaceDestination)
        .openPopup();
    Leaflet.Routing.control({
        waypoints: [
            Leaflet.latLng(LatitudeLocation, LongtitudeLocation),
            Leaflet.latLng(LatitudeDestination, LogntitudeDestination)
        ],
        lineOptions: { styles: [{ color: "red", weight: 5, opacity: 0.8 }] }, 
        routeWhileDragging : true
    }).addTo(map.value);

})
</script>
<template>
<div class="h-screen w-full ">
    <div class="h-screen w-full " id="map">

    </div>
</div>
</template>