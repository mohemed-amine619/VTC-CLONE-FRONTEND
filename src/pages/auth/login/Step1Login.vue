<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLoginStore } from '../../../stores/auth/login-store';


const loginStore = useLoginStore();

const { v$1, step1Input } = storeToRefs(loginStore);

</script>
<template>
    <InputError :errors="v$1.email.$errors">
        <input v-model="step1Input.email" class=" mb-2 border rounded-md py-2 px-2 w-[100%]" type="text" name="" id="" placeholder="Enter E-mail">
    </InputError>
    <button @click="loginStore.next"
        class=" mb-2 bg-indigo-700 text-white py-2 px-2 rounded-md shadow-sm w-[100%] active:scale-95">
        Next</button>
</template>