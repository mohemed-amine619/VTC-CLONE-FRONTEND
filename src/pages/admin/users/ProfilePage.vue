<script setup>
import { storeToRefs } from 'pinia';
import { ADMIN_ROLE, CUSTOMER_ROLE } from '../../../Constants/Role';
import { getUserData } from '../../../helper/utils';
import { useProfileStore } from '../../../stores/user/profile-store';
import { ref } from 'vue';
import SelectDriverLocation from './components/SelectDriverLocation.vue';
import { UsemapStore } from '../../../stores/maps/map-store';
import { useRoute, useRouter } from 'vue-router';
import { UseAutoCompleteStore } from '../../../stores/Vehicule/auto-complete-store';

const userData = getUserData();
const ProfileStore = useProfileStore();
const status = ref('');

const AutoCompleteStore = UseAutoCompleteStore();
const { showSuggestionLocation , queryLocation} = storeToRefs(AutoCompleteStore);
const mapStore = UsemapStore();
const { DriverLocation } = storeToRefs(mapStore);
const { loading, DriverStatus } = storeToRefs(ProfileStore);
const router = useRouter()
function showDriverStatus() {
    const role = userData?.User?.role;
    if (role === ADMIN_ROLE || role === CUSTOMER_ROLE) return false;
    return true;
}
function SelectStatus(event) {
    const selected = event.target.value;
    status.value = selected
}
async function saveStatus() {
    const UserId = userData.User.id;
    await ProfileStore.ModifyDriverStatus({
        userId: UserId,
        status: status.value
    })

}
function selectLocation(place) {
    DriverLocation.value = place
    showSuggestionLocation.value = false
    queryLocation.value = place?.properties?.full_address
}

function plotDriverLocationOnMap() {
    router.push('driver_map')
}
</script>
<template>

    <div class="h-screen w-full bg-white">
        <div class="flex flex-col ml-14">
            <div></div>
            <div></div>

            <div>
                <h1 class="text-2xl mb-10 mt-10 font-semibold">Profile</h1>

                <div class="flex flex-col gap-4 text-gray-700 mb-4">
                    <span>Name : {{ userData?.User?.name }}</span>
                    <span>E-mail : <a href="mailto:{{ userData?.User?.email }}" class="text-indigo-700 font-semibold">
                            {{ userData?.User?.email }}
                        </a> </span>
                    <span>Role : {{ userData?.User?.role }}</span>

                    <div v-show="showDriverStatus()">Status : {{ userData?.User?.status?.status === 1 ?
                        'Available' : 'Busy' }} <span class="text-gray-800 font-bold py-1 px-2 rounded-md"></span></div>

                </div>
                <hr v-show="showDriverStatus()" class="w-[25%]  py-2">

                <div v-show="showDriverStatus()" class=" mb-3">
                    <select @change="SelectStatus"
                        class="w-[25%] focus:ring focus:ring-blue-300 mb-3 border rounded-md py-2 px-2">
                        <option value="" selected disabled>Status</option>
                        <option v-for="status in DriverStatus" :key="status.value" :value="status.value">
                            {{ status.name }}
                        </option>
                    </select>

                    <button @click="saveStatus"
                        class="flex justify-center text-white bg-indigo-700 font-semibold rounded-lg px-4 py-2">
                        <span>{{ loading ? 'Saving ...' : 'change Status' }}</span>
                    </button>

                </div>

                <!-- change driver Location  -->
                <div class="">
                    <span>Change Location</span>
                    <SelectDriverLocation @SelectLocation="selectLocation" />
                    <button @click="plotDriverLocationOnMap" :disabled="loading"
                        class="flex justify-center text-white bg-indigo-700 font-semibold rounded-lg px-4 py-2">
                        change Location
                    </button>
                </div>

                <!-- end change driver location -->
            </div>
        </div>
    </div>
</template>