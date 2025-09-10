<script setup>
import { onMounted, ref } from 'vue';
import UserTable from './components/UserTable.vue';
import { useUserStore } from '../../../stores/user/user-store';
import { TailwindPagination } from 'laravel-vue-pagination';
import { storeToRefs } from 'pinia';
import Loading from '../../../components/base-components/Loading.vue';

const userStore = useUserStore();
const { userData, loading } = storeToRefs(userStore);
onMounted(async () => {
    await userStore.getUsers()
})
</script>
<template>
    <Loading :loading="loading" />
    <div class="ml-4 mr-4 w-full">
        <h1 class="text-2xl mb-4">
            User Page
        </h1>
        <UserTable :users="userData?.data" @get-users="userStore.getUsers" />
        <div class="mt-2">
            <TailwindPagination :data="userData" @pagination-change-page="userStore.getUsers" />
        </div>
    </div>
</template>
