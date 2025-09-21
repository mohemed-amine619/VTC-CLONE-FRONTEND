<script setup lang="ts">
import { App } from '../../../api/api';
import { ref } from 'vue';
import { getUserData } from '../../../helper/utils';
import { useLoginStore } from '../../../stores/auth/login-store';
import { RouterLink } from 'vue-router';

const toggleSideBar = ref(true);
const TopNavBar = ref(false);
const userData: any = getUserData();
const loginStore = useLoginStore();

const toggle = () => {
    toggleSideBar.value = !toggleSideBar.value;
}
const toggleTop = () => {
    TopNavBar.value = !TopNavBar.value;
}
</script>
<template>
    <div class="h-screen">
        <nav :class="[
            'h-full bg-slate-50 transition-all duration-300',
            toggleSideBar ? 'w-[210px]' : 'w-[50px]'
        ]">
            <div class="flex justify-between p-3">
                <img v-show="toggleSideBar" class="w-20" :src="App.baseUrl + '/img/logo.png'" alt="logo">
                <button v-if="toggleSideBar" @click="toggle" class="hover:bg-slate-200 px-2 rounded-md">
                    <CheveronIconLeft />
                </button>
                <button v-else @click="toggle" class="hover:bg-slate-200 px-2 py-2 rounded-md">
                    <CheveronIconRight />
                </button>
            </div>

            <ul class="flex flex-col p-2 gap-2">
                <li>
                    <RouterLink to="/dashboard" active-class="bg-slate-200"
                        class="flex gap-2 hover:bg-slate-200 cursor-pointer px-2 py-2 rounded-md">
                        <HomeIcon class="mt-1" />
                        <span v-show="toggleSideBar">Dashboard</span>
                    </RouterLink>
                </li>

                <li class="flex hover:bg-slate-200 gap-2 cursor-pointer px-2 py-2 rounded-md">
                    <PayementIcon class="mt-1" />
                    <span v-show="toggleSideBar">Payement</span>
                </li>
                <li>
                    <RouterLink to="/vehicules" active-class="bg-slate-200"
                        class="flex gap-2 hover:bg-slate-200 cursor-pointer px-2 py-2 rounded-md">
                        <TrucIcon class="mt-1" />
                        <span v-show="toggleSideBar">Vehicules</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/users" active-class="bg-slate-200"
                        class="flex gap-2 hover:bg-slate-200 cursor-pointer px-2 py-2 rounded-md">
                        <UsersIcon class="mt-1" />
                        <span v-show="toggleSideBar">Users</span>
                    </RouterLink>
                </li>

                <li @click="loginStore.logout"
                    class="text-red-600 flex hover:bg-slate-200 gap-2 cursor-pointer px-2 py-2 rounded-md">
                    <LogoutIcon class="mt-1" />
                    <span v-show="toggleSideBar">Logout</span>
                </li>
            </ul>
        </nav>

        <!-- main Section -->

        <!-- main Section -->
    </div>
    <div class="bg-slate-200 w-full">
        <div class="flex justify-between">
            <div></div>
            <div class="py-3 px-3">
                <img @click="toggleTop" :src="App.baseUrl + '/img/avatar.png'" alt="" class="rounded-full w-10 h-10">
                <ul v-show="TopNavBar" class="bg-white absolute right-4 py-3 px-3">
                    <li class="px-2 py-2">
                        {{ userData?.User?.name }}
                        <br>
                        <a class="text-indigo-700" href="">{{ userData?.User?.email }}</a>
                    </li>
                    <li @click="loginStore.logout"
                        class="px-2 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-red-600 ">
                        logout
                    </li>
                </ul>
            </div>
        </div>
        <div class="flex p-10">
            <slot name="main"></slot>
            <!--  <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, molestiae ullam. Nulla impedit
                officiis cumque adipisci voluptates possimus iusto veritatis natus! Hic sed nihil optio deserunt.
                Inventore quaerat sint eligendi?
            </p> -->
        </div>
    </div>
</template>