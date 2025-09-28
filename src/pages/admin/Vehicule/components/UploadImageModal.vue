<script setup>
import { storeToRefs } from 'pinia';
import { useUploadImage } from '../../../../stores/Vehicule/upload-image';
import { showError, successmesage } from '../../../../helper/utils';
import { App } from '../../../../api/api';



const UploadVehiculeStore = useUploadImage();

const { uploadImageInput, loading, modalVal } = storeToRefs(UploadVehiculeStore);

function SelectImage(e) {
    const SelectImage = e.target.files[0];
    const output = document.querySelector('#outputImage');
    output.src = URL.createObjectURL(SelectImage);
    output.onload = function () {
        URL.revokeObjectURL(SelectImage)
    }
    uploadImageInput.value.image = SelectImage
}
const props = defineProps(['show']);
const emit = defineEmits(['toggleModalUpload', "get-vehicules"]);

async function uploadImage() {
    loading.value = true;
    const payload = await UploadVehiculeStore.uploadVehiculeImage();
    fetch(App.apibaseUrl + "/vehicules/images", payload)
        .then(async (response) => response.json())
        .then(async (result) => {
            document.querySelector("#outputImage").src = "";
            document.querySelector('#imageInput').value = ''
            loading.value = false;
            modalVal.value = false
            successmesage(result?.message)
            emit("get-vehicules"); 
        })
        .catch((error) => {
            showError(error?.message);
            loading.value = false;
        });
}
</script>

<template>
    <BaseModel :show="props.show">
        <template #title>Upload Image</template>
        <template #body>
            <img style="height: 150px" alt="image" id="outputImage" />
            <label for="">Select image</label>
            <input type="file" id="imageInput" @input="SelectImage" />
        </template>
        <template #footer>
            <button @click="modalVal = false" class="mb-2 bg-red-700 text-white py-2 px-2 rounded-md shadow-sm">
                close
            </button>
            <button @click="uploadImage" :disabled="loading"
                class="mb-2 bg-indigo-700 text-white py-2 px-2 rounded-md shadow-sm">
                {{ loading ? 'uploading ...' : 'upload' }}
            </button>
        </template>
    </BaseModel>
</template>