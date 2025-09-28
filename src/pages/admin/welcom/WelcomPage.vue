<script setup lang="ts">;
import { onMounted } from 'vue';
import { App } from '../../../api/api';
import { useVehiculeStore } from '../../../stores/Vehicule/vehicule-store';
import { storeToRefs } from 'pinia';
import TaxiCards from './components/TaxiCards.vue';
import { UsemapStore } from '../../../stores/maps/map-store';
import SelectLocation from './components/SelectLocation.vue';
import SelectDestination from './components/SelectDestination.vue';
import { UseAutoCompleteStore } from '../../../stores/Vehicule/auto-complete-store';
import { useRouter } from 'vue-router';


const vehiculeStore = useVehiculeStore();
const { vehiculesData } = storeToRefs(vehiculeStore)
const mapStore = UsemapStore();
const { location, destination } = storeToRefs(mapStore)
const AutoCompleteStore = UseAutoCompleteStore();
const {showSuggestionLocation , queryDestination , queryLocation , showSuggestionDestination } = storeToRefs(AutoCompleteStore);
const router = useRouter();


function selectLocation(place : any) {
    location.value = place
    showSuggestionLocation.value = false
    queryLocation.value = place?.properties?.full_address
}
function selectDestinationplace (place: any) {
    destination.value = place
    showSuggestionDestination.value = false
    queryDestination.value = place?.properties?.full_address
}

function bookTaxi() {
    router.push('/map')
}
onMounted(async () => {
    await vehiculeStore.getVehicules();
})
</script>
<template>
    <div class="bg-white flex flex-col ">
        <div class="flex mb-5 mt-5">
            <div class="mr-20">
                <img class="w-[600px] rounded-lg ml-20" :src="App.baseUrl + '/img/book_car.png'" alt="">
            </div>
            <div class="ml-20">
                <h1 class="text-2xl mb-10 font-semibold">
                    Trust the leading and the most reliable Al taxi operator
                </h1>
                <div class="flex flex-col mb-2">
                    <Select class="mb-2 border rounded-md py-2 px-2 w-[100%]">
                        <option value="" selected disabled hidden>Select Taxi </option>
                        <option v-for="vehicule in vehiculesData?.data" :key="vehicule?.id" value="">{{ vehicule?.name
                            }} - {{ vehicule?.model }}</option>
                    </Select>
                    <div class="flex gap-2">
                        <SelectLocation @SelectLocation="selectLocation" />
                        <SelectDestination @SelectDestination="selectDestinationplace" />
                    </div>
                    <Button @click="bookTaxi"
                        class="bg-indigo-700 text-white px-2 py-2 flex justify-center rounded-md w-[100%] font-semibold">
                        <span>Book Taxi Now</span>
                        <ArrowIconRight class="pt-2" />
                    </Button>
                </div>
            </div>
        </div>
        <div class=" mx-5 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:grid-cols-5 mb-10">
            <TaxiCards :vehicules="vehiculesData" />
        </div>
    </div>
</template>