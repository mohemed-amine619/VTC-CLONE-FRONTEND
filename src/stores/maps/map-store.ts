import { acceptHMRUpdate, defineStore } from "pinia";
import { ref, type Ref } from "vue";
import getData from "../../helper/http";
import { showError } from "../../helper/utils";


export const UsemapStore = defineStore('map-store', () => {
    const CustomerDestination :  Ref<any, any> = ref({});
    const CustomerLocation: Ref<any, any> = ref({});
    const DriverLocation: Ref<any, any> = ref({});
    const PlacesData: Ref<any, any> = ref({});
    const loading = ref(false)
    function getCustomerLocationCoordinate() {
        const longtitude = CustomerLocation.value?.properties?.coordinates?.longitude
        const latitude = CustomerLocation?.value?.properties?.coordinates?.latitude
        const place = CustomerLocation?.value?.properties?.full_address
   
        return {longtitude , latitude , place}
    }
    function getCustomerDestinationcoordinate() {
        const longtitude = CustomerDestination?.value?.properties?.coordinates?.longitude
        const latitude = CustomerDestination?.value?.properties?.coordinates?.latitude
        const place = CustomerDestination?.value?.properties?.full_address

         return { longtitude, latitude, place }
    }
    function getDriverLocationcoordinate() {
        const longtitude = DriverLocation?.value?.properties?.coordinates?.longitude
        const latitude = DriverLocation?.value?.properties?.coordinates?.latitude
        const place = DriverLocation?.value?.properties?.full_address

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
        CustomerDestination,
        CustomerLocation,
        DriverLocation,
        loading,
        PlacesData,
        getPlaces,
        getCustomerLocationCoordinate,
        getCustomerDestinationcoordinate,
        getDriverLocationcoordinate
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(
        acceptHMRUpdate(UsemapStore, import.meta.hot)
    );
}

