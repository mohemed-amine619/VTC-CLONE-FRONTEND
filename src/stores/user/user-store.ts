import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";
import getData from "../../helper/http";
import { showError } from "../../helper/utils";


export const useUserStore = defineStore('user-store', () => {
    const userData = ref({});
    const loading = ref(false);

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
    return {
        userData,
        loading,
        getUsers
    }
})
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
} 