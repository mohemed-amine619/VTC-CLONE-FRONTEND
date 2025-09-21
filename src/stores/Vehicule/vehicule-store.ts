import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import getData, { DeleteData, postData, PutData } from "../../helper/http";
import { showError, successmesage } from "../../helper/utils";
import { numeric, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";


export const useVehiculeStore = defineStore('vehicule-store', () => {
    const vehiculesData: Ref<{}, {}> = ref({});
    const loading = ref(false);
    const modalVal = ref(false);
    const edit = ref(false);
    const CreateVehiculeForm = ref({
        id:"",
        name: "",
        model: "",
        price: ""
    })
    const rulesCreateVehicule = {
        name: { required },
        model: { required },
        price: { required, numeric },
    }
   
    const v$CreateVehicule = useVuelidate(rulesCreateVehicule, CreateVehiculeForm);

    function toggleModal() {
        CreateVehiculeForm.value = { id: "", name: "", model: '', price: '' }
        modalVal.value = !modalVal.value;
        if (edit.value === true) edit.value = false;
    }
    async function CreateOrUpdateVehicule() { 
        const valid = await v$CreateVehicule.value.$validate();
        if (!valid) return 
        try {
            loading.value = true;
            const data: any =
                edit.value ? await PutData('/vehicules', {
                    "id": CreateVehiculeForm.value.id,
                    'name': CreateVehiculeForm.value.name,
                    'model': CreateVehiculeForm.value.model,
                    'price': CreateVehiculeForm.value.price
                }) : await postData('/vehicules', {
                    'name': CreateVehiculeForm.value.name,
                    'model': CreateVehiculeForm.value.model,
                    'price': CreateVehiculeForm.value.price
            }) 
            successmesage(data?.message);
            v$CreateVehicule.value.$reset();
            CreateVehiculeForm.value = { id: "", name: "", model: '', price: '' }
            modalVal.value = false
            edit.value = false
            loading.value = false
        } catch (errors: any) {
            loading.value = false;
            for (const message of errors) {
                showError(message);
            }
        }
    }
    async function deleteVehicle(vehicule :any) {

        try {
            loading.value = true;
            const data : any = await DeleteData(`/vehicules`, { id: vehicule.id });
            successmesage(data?.message)
            loading.value = false;
        } catch (errors : any) {
            loading.value = false;
            for (const message of errors) {
                showError(message);
            }
        }

    }
    async function getVehicules(pages = 1, query: any = "") {
        try {
            loading.value = true
            const data: any = await getData(`/vehicules?page=${pages}&params=${query}`);
            vehiculesData.value = data;
            loading.value = false
        } catch (errors: any) {
            loading.value = false;
            for (const message of errors) {
                showError(message);
            }
        }

    }
    
    return {
        vehiculesData,
        loading,
        v$CreateVehicule,
        CreateVehiculeForm,
        modalVal,
        edit,
        deleteVehicle,
        getVehicules,
        CreateOrUpdateVehicule,
        toggleModal,
    }
});