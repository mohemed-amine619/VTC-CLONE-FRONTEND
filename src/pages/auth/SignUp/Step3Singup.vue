<script setup>
import { onMounted } from 'vue';
import { useSignUpStore } from '../../../stores/auth/signup-store';
import { storeToRefs } from 'pinia';

const singupstore = useSignUpStore();

const { vstep3$, step3Input, step1Input , loading } = storeToRefs(singupstore);


</script>
<template>
<Loading :loading="loading"/>
<span>
    <a class="text-indigo-700" href="">{{ step1Input.email }}</a>
</span>

    <InputError :errors="vstep3$.otp_code.$errors">
        <input v-model="step3Input.otp_code"  class=" mb-2 border rounded-md py-2 px-2 w-[100%]" type="text" name="" id="" placeholder="Enter Code">
    </InputError>

    <div class="flex justify-between">
        <button @click="singupstore.movestep2"
            class=" mb-2 border border-indigo-700 text-gray-500 py-2 px-2 rounded-md shadow-sm w-[48%] hover:bg-white hover:text-slate-800 active:scale-95">
            Previous</button>
        <button @click="singupstore.singup"
            class=" mb-2 bg-indigo-700 text-white py-2 px-2 rounded-md shadow-sm w-[48%] hover:bg-indigo-800 active:scale-95">
            Sign
            Up</button>
    </div>

</template>