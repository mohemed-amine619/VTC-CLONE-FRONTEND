<script setup >
import { App } from '../../../../api/api';


const props = defineProps(['vehicules' , 'hideBookButton'])
</script>
<template>
    <div class=" flex flex-col shadow-md" v-for="car in vehicules.data" :key="car?.id">
        <div align=" center">
            <img class="w-[300px] h-[150px] rounded-lg" :src="car?.image" alt="taxi">
            <div class="ml-5">
                <span class="text-xl text-gray-700">{{ car?.name}} - {{ car?.model }}</span>

            </div>
            <div class="ml-5">
                <span class="text-bold text-xl">

                    {{ car?.price}} $ / KM
                </span>
            </div>
            <div class="flex justify-center p-2 mb-2">
                <button
                 v-show="hideBookButton"
                    class="gap-2 flex rounded-md border border-indigo-700 text-gray-800 px-2 py-2 hover:bg-indigo-700 hover:text-white font-semibold text-sm">
                    <span>Book Taxi Now</span>
                    <ArrowIconRight class="pt-1" />
                </button>
            </div>
        </div>
    </div>
</template>