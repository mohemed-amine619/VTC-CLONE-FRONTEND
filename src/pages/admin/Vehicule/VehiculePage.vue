<script setup>
import { onMounted, ref, watch } from 'vue';
import { TailwindPagination } from 'laravel-vue-pagination';
import { storeToRefs } from 'pinia';
import UploadImageModal from './components/UploadImageModal.vue';
import VehiculeTable from './components/VehiculeTable.vue';
import { useVehiculeStore } from '../../../stores/Vehicule/vehicule-store';
import VehiculeModel from './components/VehiculeModel.vue';
import { promptUser } from '../../../helper/utils';
import { useUploadImage } from '../../../stores/Vehicule/upload-image';


const vehiculeStore = useVehiculeStore();
const { vehiculesData, loading, modalVal, CreateVehiculeForm, edit } = storeToRefs(vehiculeStore);

const UploadVehicule = useUploadImage();

const { modalVal:uploadImageVehiculeModal, uploadImageInput } = storeToRefs(UploadVehicule);

function editVehicule(vehicule) {
    CreateVehiculeForm.value = vehicule
    edit.value = true
    modalVal.value = true
}
function removeVehicule(vehicule) {
    promptUser(`Are You Sure About Delete the vehicule ${vehicule.name} !!`).then(async () => {
        await vehiculeStore.deleteVehicle(vehicule);
        await vehiculeStore.getVehicules();
    })
}
function uploadImage(id) {
    uploadImageInput.value.id = id;
    uploadImageVehiculeModal.value = true
}
onMounted(async () => {
    await vehiculeStore.getVehicules()
})
</script>
<template>
    <Loading :loading="loading" />
    <div class="ml-4 mr-4 w-full">
        <VehiculeModel @getVehicles="vehiculeStore.getVehicules" :show="modalVal" :loading="loading" @toggleModal="vehiculeStore.toggleModal" />
        <UploadImageModal :show="uploadImageVehiculeModal" @toggleModalUpload="UploadVehicule.toggleModalUpload"
            :loading="loading" />
        <h1 class="text-2xl mb-4">
            Vehicules Page
        </h1>

        <VehiculeTable @uploadImage="uploadImage" @removeVehicle='removeVehicule' @editVehicule='editVehicule'
            @showModal="vehiculeStore.toggleModal" :Vehicules="vehiculesData.data" />
        <div class="mt-2">
            <TailwindPagination :data="vehiculesData" @pagination-change-page="vehiculeStore.getVehicules" />
        </div>
    </div>
</template>
<style scoped>
button.relative.inline-flex.items-center.px-4.py-2.text-sm.font-medium.border.focus\:z-20.bg-blue-50.border-blue-500.text-blue-600.z-30 {
    background: #4f46e5;
    color: white;
}
</style>