<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLoginStore } from '../../../stores/auth/login-store';


const loginStore = useLoginStore();
const { isLoading , v$2 ,  step2Input } = storeToRefs(loginStore);
</script>
<template>
    <Loading :Loading="isLoading" />
    <InputError :errors="v$2.password.$errors">
        <input v-model="step2Input.password"  class=" mb-2 border rounded-md py-2 px-2 w-[100%]" type="password" name="" id=""
            placeholder="Enter Password">
    </InputError>
    <div class="flex justify-between">
        <button @click="loginStore.previous"
            class=" mb-2 border border-indigo-700 text-gray-500 py-2 px-2 rounded-md shadow-sm w-[48%] active:scale-95">
            Previous</button>
        <button
            class=" mb-2 bg-indigo-700 text-white py-2 px-2 rounded-md shadow-sm w-[48%] active:scale-95  hover:transition-transform"
            @click="loginStore.login"
            >
            Sign
            In</button>
    </div>

</template>