import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";
import { getUserData } from "../../helper/utils";



export const useUploadImage = defineStore('upload-vehicule-store', () => {
    const uploadImageInput = ref({ id: '', image: '' });
    const modalVal = ref(false);
    const loading = ref(false);
    function toggleModalUpload() {
        modalVal.value = !modalVal.value;
    }
    async function uploadVehiculeImage() {
        return new Promise((resolve, reject) => {
            try {
                const userData = getUserData();
                const myHeaders = new Headers();
                myHeaders.append("Accept", "application/json");
                myHeaders.append("Authorization", "Bearer " + userData?.token);
                const formdata = new FormData();
                formdata.append("id", uploadImageInput.value.id);
                formdata.append("image", uploadImageInput.value.image);
                const uploadImagePayload = {
                    method: "post",
                    headers: myHeaders,
                    body: formdata,
                };
                resolve(uploadImagePayload)
            } catch (error) {
                reject(error);
            }
        })


    }
    return {
        uploadImageInput,
        modalVal,
        loading,
        toggleModalUpload,
        uploadVehiculeImage,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(
        acceptHMRUpdate(useUploadImage, import.meta.hot)
    );
}

