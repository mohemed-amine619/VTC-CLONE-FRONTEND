<script setup>
import { onMounted, ref } from "vue";
import { App } from "../../api/api"
import { useLoginStore } from "../../stores/auth/login-store";
import Step1Login from "./login/Step1Login.vue";
import Step2Login from "./login/Step2Login.vue";
import Step1Singup from "./SignUp/Step1Singup.vue";


const loginStore = useLoginStore();

onMounted(() => {
    loginStore.currentstep = Step1Login;
    loginStore.step1 = Step1Login;
    loginStore.step2 = Step2Login
})
</script>

<template>
    <div class="flex flex-row justify-between mt-40 ">
        <div></div>
        <div class="w-[300px]">
            <h1 class="mb-3 text-3xl font-semibold">
                Sign In
            </h1>

            <div>
                <keep-alive>
                    <component :is="loginStore.currentstep"></component>
                </keep-alive>
                <div class="flex">
                    <router-link to="/signup" class="font-medium hover:underline">you dosent have account
                        ?</router-link>
                </div>
                <div class="flex mb-2">
                    <hr class="h-[1px] bg-black w-[48%] mt-3">
                    <div>OR</div>
                    <hr class="h-[1px] bg-black w-[48%] mt-3">
                </div>
                <button
                @click="cal"
                    class="flex justify-center bg-gray-300 rounded-md py-2 px-2 gap-2 w-[100%] hover:bg-gray-400 hover:shadow-lg transition-shadow active:scale-95">
                    <img class="w-6" :src="App.baseUrl + '/img/google.svg'" alt="logo">
                    <span>Continue With Google</span>
                </button>
            </div>
        </div>
        <div></div>
    </div>
</template>