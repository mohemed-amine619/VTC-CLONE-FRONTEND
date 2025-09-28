<script setup>
import { ADMIN_ROLE, CUSTOMER_ROLE } from '../../../Constants/Role';
import { getUserData } from '../../../helper/utils';

const userData = getUserData();

function showDriverStatus() {
    const role = userData?.User?.role;
    if (role === ADMIN_ROLE || role === CUSTOMER_ROLE) return false;
    return true;
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
                    <span>Role : </span>

                    <div v-show="showDriverStatus()">Status : available <span
                            class="text-gray-800 font-bold py-1 px-2 rounded-md"></span></div>

                </div>
                <hr v-show="showDriverStatus()" class="w-[25%]  py-2">

                <div v-show="showDriverStatus()" class=" mb-3">
                    <select class="w-[25%] focus:ring focus:ring-blue-300 mb-3 border rounded-md py-2 px-2">
                        <option value="">Status</option>
                        <option>
                            available
                        </option>
                        <option>
                            Busy
                        </option>
                    </select>

                    <button class="flex justify-center text-white bg-indigo-700 font-semibold rounded-lg px-4 py-2">
                        <span></span>
                    </button>
                </div>



                <!-- change driver location  -->
                <div>
                    <SelectDriverLocation @selectPlace="selectLocation" :placeholder="'Type Location'" />

                    <button @click="plotDriverLocationOnMap"
                        class="flex justify-center text-white bg-indigo-700 font-semibold rounded-lg px-4 py-2">
                        <span>Change Location</span>
                    </button>
                </div>
                <!-- end change driver location -->
            </div>
        </div>
    </div>
</template>