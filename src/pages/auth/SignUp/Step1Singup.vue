<script setup>
import { onMounted } from 'vue';
import { useLoginStore } from '../../../stores/auth/login-store';
import { useSignUpStore } from '../../../stores/auth/signup-store';
import { storeToRefs } from 'pinia';
import { Input } from 'postcss';


const singupstore = useSignUpStore();
const { v$, step1Input } = storeToRefs(singupstore);


</script>
<template>
    <InputError :errors="v$.name.$errors">
        <input v-model="step1Input.name" class=" mb-2 border rounded-md py-2 px-2 w-[100%]" type="text"
            placeholder="Enter Name">
    </InputError>
    <InputError :errors="v$.email.$errors">
        <input v-model="step1Input.email" class=" mb-2 border rounded-md py-2 px-2 w-[100%]" type="text" name="" id=""
            placeholder="Enter E-mail">
    </InputError>

    <button @click="singupstore.movestep2"
        class=" mb-2 bg-indigo-700 text-white py-2 px-2 rounded-md shadow-sm w-[100%]  hover:bg-indigo-800 active:scale-95">
        Next</button>
</template>