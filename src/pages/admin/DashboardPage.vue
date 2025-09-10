<script setup lang="ts">
import { RouterView } from "vue-router";
import SideBar from './components/SideBar.vue';


</script>
<template>
    <div class="flex">
        <SideBar>
            <template #main>
               <RouterView />
            </template>
        </SideBar> 
    </div>
</template>
<RouterView