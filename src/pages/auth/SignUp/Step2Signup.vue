<script setup>
import { onMounted } from 'vue';
import { useSignUpStore } from '../../../stores/auth/signup-store';
import { storeToRefs } from 'pinia';

const singupstore = useSignUpStore();

const { vstep2$, step2Input , loading } = storeToRefs(singupstore);

</script>
<template>
    <Loading :loading="loading" />
    <InputError :errors="vstep2$.password.$errors">
        <input v-model="step2Input.password" class=" mb-2 border rounded-md py-2 px-2 w-[100%]" type="password" name="" id=""
            placeholder="Enter Password">
    </InputError>

    <div class="flex justify-between">
        <button @click="singupstore.movestep1"
            class=" mb-2 border border-indigo-700 text-gray-500 py-2 px-2 rounded-md shadow-sm w-[48%] hover:bg-white hover:text-slate-800 active:scale-95">
            Previous</button>
        <button @click="singupstore.movestep3"
            class=" mb-2 bg-indigo-700 text-white py-2 px-2 rounded-md shadow-sm w-[48%] hover:bg-indigo-800 active:scale-95">
            Next</button>
    </div>

</template>