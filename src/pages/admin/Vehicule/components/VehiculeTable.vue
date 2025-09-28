<script setup>
import { onMounted, ref } from 'vue';
import { _debounce, getUserData } from '../../../../helper/utils';


const props = defineProps(['Vehicules']);
const emit = defineEmits(['showModal', 'get-vehicules', 'editVehicle', 'uploadImage', 'removeVehicle']);

</script>
<template>
    <div class="flex justify-end p-2">
        <button @click="emit('showModal')"
            class="text-indigo-600 px-2 py-1 rounded-md border border-indigo-700 hover:bg-indigo-600 decoration-slate-700  hover:text-white transition-colors ease-in ">
            Add New
        </button>
    </div> 
    <table class="border-collapse bg-white w-full rounded-md shadow-md border border-gray-300">
        <thead>
            <tr class="bg-gray-100 text-left">
                <th class="border border-gray-300 py-2 px-4">Id</th>
                <th class="border border-gray-300 py-2 px-4">Image</th>
                <th class="border border-gray-300 py-2 px-4">Name</th>
                <th class="border border-gray-300 py-2 px-4">Model</th>
                <th class="border border-gray-300 py-2 px-4">Price/Km</th>
                <th class="border border-gray-300 py-2 px-4">Upload Image</th>
                <th class="border border-gray-300 py-2 px-4">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="!(Vehicules && Vehicules.length)">
                <td colspan="7" class="bg-slate-900 text-xl text-center border border-gray-300 py-2 px-4">
                    <span class="  text-red-600 font-bold">
                        No Data available
                    </span>
                </td>
            </tr>
            <tr v-else v-for="(vehicule, index) in Vehicules" :key="vehicule?.id" class="text-left">
                <td class="border border-gray-300 py-2 px-4">{{ index + 1 }}</td>
                <td class="border border-gray-300 py-2 px-4">
                    <img :src="vehicule?.image" :alt="vehicule?.name" class="w-10">
                </td>
                <td class="border  border-gray-300 py-2 px-4">{{ vehicule?.name }}</td>
                <td class="border border-gray-300 py-2 px-4">{{ vehicule?.model }}</td>
                <td class="border border-gray-300 py-2 px-4">{{ vehicule?.price }}</td>
                <td class="border border-gray-300 py-2 px-4">
                    <a @click="emit('uploadImage', vehicule?.id)" href="javascript:void(0)"
                        class="text-slate-700 hover:text-indigo-500 trans">
                        <UploadIcon />
                    </a>
                </td>
                <td class="border flex space-x-4 border-gray-300 py-2 px-4">
                    <a @click="emit('editVehicule', vehicule)" href="javascript:void(0)"
                        class="text-green-700 hover:text-green-500 ">
                        <PencilSquareIcon />
                    </a>
                    <a href="javascript:void(0)" @click="emit('removeVehicle' , vehicule)"
                        class="text-red-700 hover:text-red-500">
                        <TrashIcon />
                    </a>
                </td>
            </tr>
        </tbody>

    </table>
</template>