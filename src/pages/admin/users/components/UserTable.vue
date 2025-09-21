<script setup >
import { onMounted, ref } from 'vue';
import { _debounce, getUserData } from '../../../../helper/utils';


const props = defineProps(['users']);
const emit = defineEmits(['getUsers' , 'toggleModal']);
const params = ref('');
const page = ref(1)
const searchUser = _debounce(function () {
    emit('getUsers', page.value , params.value)
} , 200)

</script>
<template>
    <div class="flex">
        <input @keydown="searchUser" v-model="params" type="text" placeholder="search... "
            class="mb-2 border rounded-md py-2 px-2 w-full">
    </div>
    <table class="bg-white w-full rounded-md shadow-md border border-gray-300">
        <thead>
            <tr class="bg-gray-100 text-left">
                <th class="border border-gray-300 py-2 px-4">Id</th>
                <th class="border border-gray-300 py-2 px-4">Name</th>
                <th class="border border-gray-300 py-2 px-4">Email</th>
                <th class="border border-gray-300 py-2 px-4">Role</th>
                <th class="border border-gray-300 py-2 px-4">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="!(users && users.length)">
                <td colspan="5" class="bg-slate-900 text-xl text-center border border-gray-300 py-2 px-4">
                    <span class="  text-red-600 font-bold">
                        No Data available
                    </span>
                </td>
            </tr>
            <tr v-else v-for="(user , index) in users" :key="user?.id" class="text-left">
                <td class="border border-gray-300 py-2 px-4">{{ index+1 }}</td>
                <td class="border border-gray-300 py-2 px-4">{{ user?.name }}</td>
                <td class="border border-gray-300 py-2 px-4">{{ user?.email }}</td>
                <td class="border border-gray-300 py-2 px-4">{{ user?.role }}</td>
                <td class="border flex space-x-4 border-gray-300 py-2 px-4">
                    <a @click="emit('toggleModal' , user?.id)" href="javascript:void(0)" class="text-green-700 hover:text-green-500 trans">
                        <PencilSquareIcon />
                    </a>
                    <a  href="" class="text-red-700 hover:text-red-500">
                        <TrashIcon />
                    </a>
                </td>
            </tr>
        </tbody>

    </table>
</template>