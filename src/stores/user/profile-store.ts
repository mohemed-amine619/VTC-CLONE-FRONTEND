import { acceptHMRUpdate, defineStore } from "pinia";
import { postData } from "../../helper/http";
import { showError, successmesage } from "../../helper/utils";
import { ref } from "vue";

export const useProfileStore = defineStore('profile-store', () => {
    const loading = ref(false);
    const DriverStatus = ref([
        {
            value: 0,
            name: 'Busy'
        },
        {
            value: 1,
            name: 'Available'
        }
    ]);

    async function ModifyDriverStatus(input: any) {
        try {
            loading.value = true
            const data: any = await postData('/driver/changestatus', {
                ...input
            });
            loading.value = false;
            successmesage(data?.message)
        } catch (errors: any) {
            for (const message of errors) {
                loading.value = false
                showError(message);
            }
        }
    }
    return {
        loading,
        DriverStatus,
        ModifyDriverStatus

    }
})
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot));
}