import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";
import getData, { postData } from "../../helper/http";
import { showError, successmesage } from "../../helper/utils";


export const useUserStore = defineStore('user-store', () => {
    const userData = ref({});
    const loading = ref(false);
    const modalVal = ref(false);
    const roles = ref(['ADMIN', 'CUSTOMER', 'DRIVER']);
    const userId = ref(null);
    function toggleModal(userIds : any) {
        modalVal.value = !modalVal.value
        userId.value = userIds
    }
    async function getUsers(pages :any = 1 , query : any = '') : Promise<any>{
        try {
            loading.value = true;
            const data : any = await getData(`/users?page=${pages}&params=${query}`);
            userData.value = data
            loading.value = false
        }
        catch (errors : any) {
            loading.value = false;
            for (const message of errors) {
                showError(message);
            }
        }
    }
    async function ModifiedRole(roleName: any): Promise<any> {
        try {
            loading.value = true;
            const data: any = await postData(`/users/modify-role`, {
                userId: userId.value,
                role: roleName
            });
           successmesage(data.message)
            loading.value = false
            getUsers()
        }
        catch (errors: any) {
            loading.value = false;
            for (const message of errors) {
                showError(message);
            }
        }
    }
    return {
        userData,
        loading,
        getUsers,
        roles,
        toggleModal,
        modalVal,
        ModifiedRole
    }
})
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
} 