import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { postData } from "../../helper/http";
import { showError, successmesage } from "../../helper/utils";
import { router } from "../../router";

export const useSignUpStore = defineStore('signup', () => {
    const currentstep = ref("currentStep");
    const step1 = ref('step1');
    const step2 = ref('step2');
    const step3 = ref('step3');
    const loading = ref(false);

    const step1Input = ref({
        name: "mohamed",
        email: "mohamed.bougriou@beyn.io"
    })
    const step2Input = ref({
        password:""
    })
    const step3Input = ref({
        otp_code:""
    })

    const ruleStep1 = {
        name: { required },
        email: { required, email },
    }
    const ruleStep2 = {
        password: { required }
    }
    const ruleStep3 = {
        otp_code: { required }
    }

    const v$ = useVuelidate(ruleStep1, step1Input);
    const vstep2$ = useVuelidate(ruleStep2, step2Input);
    const vstep3$ = useVuelidate(ruleStep3, step3Input);
    async function movestep1() {
        currentstep.value = step1.value
    }
    async function movestep2() {
        const valid = await v$.value.$validate();
        if (!valid) return
        currentstep.value = step2.value;
    }
    async function movestep3() {
        const valid = await vstep2$.value.$validate();
        if (!valid) return
        try {
            loading.value = true
            const data:any = await postData('/users', { ...step1Input.value, ...step2Input.value });
            successmesage(data?.message);
            loading.value = false
            currentstep.value = step3.value;
        } catch (errors: any) {
            loading.value = false
            for (const message of errors) {
                showError(message)
            }
        }
       
    }
    async function singup() {
        const valid = await vstep3$.value.$validate();
        if (!valid) return
        try {
            loading.value = true
            const data: any = await postData('/users/verify-email', { ...step1Input.value, ...step3Input.value });
            successmesage(data?.message);
            loading.value = false
            router.push('/login')
        } catch (errors:any) {
            loading.value = false
            for (const message of errors) {
                showError(message)
            }
        }
    }
    return {
        currentstep,
        step1,
        step2,
        step3,
        step1Input,
        step2Input,
        step3Input,
        v$,
        vstep2$,
        vstep3$,
        loading,
        movestep1,
        movestep2,
        movestep3,
        singup,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSignUpStore, import.meta.hot))
}