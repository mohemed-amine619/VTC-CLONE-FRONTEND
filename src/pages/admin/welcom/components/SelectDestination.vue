<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { _debounce } from '../../../../helper/utils';
import { UsemapStore } from '../../../../stores/maps/map-store';
import { UseAutoCompleteStore } from '../../../../stores/Vehicule/auto-complete-store';
import { App } from '../../../../api/api';

const mapstore = UsemapStore();
const AutoCompleteStore = UseAutoCompleteStore();
const { queryDestination, showSuggestionDestination } = storeToRefs(AutoCompleteStore);
const { PlacesData , loading : loadingDestination } = storeToRefs(mapstore);


const search = _debounce(async function () {
    await mapstore.getPlaces(queryDestination.value)
}, 100)

const emit = defineEmits(['SelectDestination']);

</script>
<template>
    <div class="relative w-full max-w-sm">
        <div>
            <span class="absolute top-3 left-1">
                <MapIcon />
            </span>
            <input v-model="queryDestination" @keydown="search" 
                @focus="showSuggestionDestination = true" type="text" placeholder="Selcet Destination"
                class="mb-2 border rounded-md ring focus:ring-blue-200 py-2 px-6 w-[100%] ">
            <span v-show="loadingDestination" class="absolute top-2 right-5">
                <img width="30px" :src="App.baseUrl + '/img/spinner.gif'" />
            </span>
        </div>
        <ul v-show="showSuggestionDestination"
            class="w-full z-10 bg-white border rounded-md shadow-lg border-gray-200 min-h-48 absolute overflow-y-auto">
            <li @click="emit('SelectDestination', place)" v-for="place in PlacesData" :key="place?.properties?.mapbox_id"
                class="py-4 px-2 hover:bg-blue-100 cursor-pointer">
                {{ place?.properties?.full_address }}
            </li>
        </ul>
    </div>
</template>