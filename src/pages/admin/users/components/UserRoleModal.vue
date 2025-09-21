<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '../../../../stores/user/user-store';
import { ref } from 'vue';

const userStore = useUserStore()
const props = defineProps(['show', 'roles' , 'loading' ]);
const emit = defineEmits(['toggleModal']);
const role = ref(null)
function changeRole(event) {
    role.value = event.target.value
}
async function saveRole() {
    userStore.ModifiedRole(role.value);
}
</script>

<template>
    <BaseModel :show="props.show">
        <template #title>Edit Role</template>
        <template #body>
            <select @change="changeRole" name="" id="" class="mb-2 border rounded-md py-2 px-2 w-[100%]">
                <option value="" selected disabled>Select Role </option>
                <option :value="role" v-for="role in roles" key="role">
                    {{role}}
                </option>
            </select>
        </template>
        <template #footer>
            <button @click="emit('toggleModal')"
                class="mb-2 bg-red-700 text-white py-2 px-2 rounded-md shadow-sm">
                close
            </button>
            <button
            :disabled="props.loading"
            @click="saveRole"
             class="mb-2 bg-indigo-700 text-white py-2 px-2 rounded-md shadow-sm">
                {{loading?"Saving...":"Save"}}
            </button>
        </template>
    </BaseModel>
</template>