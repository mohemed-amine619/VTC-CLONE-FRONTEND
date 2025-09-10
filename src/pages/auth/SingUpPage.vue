<script setup>
import { onMounted } from "vue";
import { App } from "../../api/api"
import { useSignUpStore } from "../../stores/auth/signup-store";
import Step1Singup from "./SignUp/Step1Singup.vue";
import Step2Signup from "./SignUp/Step2Signup.vue";
import Step3Singup from "./SignUp/Step3Singup.vue";
import { RouterLink } from "vue-router";


const signupstore = useSignUpStore();
onMounted(() => {
    signupstore.currentstep = Step1Singup;
    signupstore.step1 = Step1Singup;
    signupstore.step2 = Step2Signup
    signupstore.step3 = Step3Singup;
})
</script>

<template>
    <div class="flex flex-row justify-between mt-40 ">
        <div></div>
        <div class="w-[300px]">
            <h1 class="mb-3 text-3xl font-semibold">
                Sign Up
            </h1>
            <div>
                <keep-alive>
                    <component :is="signupstore.currentstep"></component>
                </keep-alive>
                <div class="flex">  
                    <router-link to="/login" class="font-medium hover:underline">Sign in ?</router-link>
                </div>
                <div class="flex mb-2">
                    <hr class="h-[1px] bg-black w-[48%] mt-3">
                    <div>OR</div>
                    <hr class="h-[1px] bg-black w-[48%] mt-3">
                </div>
                <button class="flex justify-center bg-gray-300 rounded-md py-2 px-2 gap-2 w-[100%] hover:bg-gray-400 hover:translate-x-1 hover:shadow-lg hover:shadow-black transition-shadow active:shadow-none">
                    <img class="w-6" :src="App.baseUrl + '/img/google.svg'" alt="logo">
                    <span>Continue With Google</span>
                </button>
            </div>
        </div>
        <div></div>
    </div>
</template>