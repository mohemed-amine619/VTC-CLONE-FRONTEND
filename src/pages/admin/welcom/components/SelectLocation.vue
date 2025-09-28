<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { _debounce } from '../../../../helper/utils';
import { UsemapStore } from '../../../../stores/maps/map-store';
import { UseAutoCompleteStore } from '../../../../stores/Vehicule/auto-complete-store';
import { App } from '../../../../api/api';


const mapstore = UsemapStore();
const { PlacesData , loading : loadinglocation }  = storeToRefs(mapstore);

const AutoCompleteStore = UseAutoCompleteStore();
const { queryLocation , showSuggestionLocation } = storeToRefs(AutoCompleteStore);


const search = _debounce(async function () {
    await mapstore.getPlaces(queryLocation
        .value)
} , 100)

const emit = defineEmits(['SelectLocation']);

</script>
<template>
    <div class="relative w-full max-w-sm">
        <div>
            <span class="absolute top-3 left-1">
                <MapIcon />
            </span>
            <input v-model="queryLocation" @keydown="search" @focus="showSuggestionLocation=true"
                type="text" placeholder="Select Location"
                class="mb-2 border rounded-md ring focus:ring-blue-200 py-2 px-6 w-[100%] ">
            <span v-show="loadinglocation" class="absolute top-2 right-5">
                <img width="30px" :src="App.baseUrl + '/img/spinner.gif'" />
            </span>
        </div>
        <ul v-show="showSuggestionLocation"
            class="w-full z-10 bg-white border rounded-md shadow-lg border-gray-200 min-h-48 absolute overflow-y-auto">
            <li @click="emit('SelectLocation' , place)" v-for="place in PlacesData" :key="place?.properties?.mapbox_id"
                class="py-4 px-2 hover:bg-blue-100 cursor-pointer">
                {{ place?.properties?.full_address }}
            </li>
        </ul>
    </div>
</template>