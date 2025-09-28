import { acceptHMRUpdate, defineStore } from "pinia";
import { ref, type Ref } from "vue";
import getData from "../../helper/http";
import { showError } from "../../helper/utils";


export const UsemapStore = defineStore('map-store', () => {
    const destination :  Ref<any, any> = ref({});
    const location : Ref<any , any> = ref({});
    const PlacesData: Ref<any, any> = ref({});
    const loading = ref(false)
    function getLocationCoordinate() {
        const longtitude = location?.value?.properties?.coordinates?.longitude
        const latitude = location?.value?.properties?.coordinates?.latitude
        const place = location?.value?.properties?.full_address
        console.log({ longtitude, latitude, place })
        return {longtitude , latitude , place}
    }
    function getDestinationcoordinate() {
        const longtitude = destination?.value?.properties?.coordinates?.longitude
        const latitude =    destination?.value?.properties?.coordinates?.latitude
        const place = destination?.value?.properties?.full_address
        console.log({ longtitude, latitude, place })
         return { longtitude, latitude, place }
    }
    async function getPlaces(query: any = "") {
        try {
            loading.value = true
            const data: any = await getData(`/places?place=${query}`);
            PlacesData.value = data?.features,
                loading.value = false
        } catch (errors: any) {
            loading.value = false;
            for (const message of errors) {
                showError(message);
            }
        }

    }

    return {
        destination,
        location,
        loading,
        PlacesData,
        getPlaces,
        getLocationCoordinate,
        getDestinationcoordinate
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(
        acceptHMRUpdate(UsemapStore, import.meta.hot)
    );
}

