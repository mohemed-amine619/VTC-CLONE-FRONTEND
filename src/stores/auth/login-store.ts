import useVuelidate from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";
import { postData } from "../../helper/http";
import { getUserData, setUserData, showError, successmesage } from "../../helper/utils";
import { router } from "../../router";



export const useLoginStore = defineStore('login', () => {
    const currentstep = ref("currentStep");
    const step1 = ref('step1');
    const step2 = ref('step2');
    const isLoading = ref(false);
    const step1Input = ref({
        email : ""
    })
    const step2Input = ref({
        password : ""
    })
    const rules1 = ref({
        email: {required,email}
    })
    const rules2 = ref({
        password : {required}
    })
    const v$1 = useVuelidate(rules1, step1Input);
    const v$2 = useVuelidate (rules2, step2Input);
    async function next() {
        isLoading.value = true;
        const valid = await v$1.value.$validate();
        if (!valid) return
        currentstep.value = step2.value;    
    }
    function previous() {
        currentstep.value = step1.value
    }
    async function login() {
          const valid = await v$2.value.$validate();
            if (!valid) return
            try {
                isLoading.value = true
                const data: any = await postData('/login', { ...step1Input.value, ...step2Input.value });
                setUserData(data);
                successmesage(data?.message);
                isLoading.value = false
                router.push('dashboard')
            } catch (errors:any) {
                isLoading.value = false
                for (const message of errors) {
                    showError(message)
                }
            }
    }
    async function logout() {
        try {
            const userData = getUserData();
            isLoading.value = true;
            const data:any = await postData('/logout', {
                userId: userData?.User.id
            });
            if (data?.message) {
                isLoading.value = false;
                localStorage.clear();
                router.push('/login')
            }

        }
        catch (errors : any) {
            isLoading.value = false;
            for (const message of errors) {
                showError(message)
            }
        
        }
    }
    return {
        currentstep,
        step1,
        step2,
        step1Input,
        step2Input,
        isLoading,
        v$1,
        v$2,
        next,
        login,
        logout,
        previous
    }
})
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useLoginStore, import.meta.hot))
}