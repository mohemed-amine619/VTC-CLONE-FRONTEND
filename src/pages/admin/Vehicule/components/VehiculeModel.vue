<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '../../../../stores/user/user-store';
import { computed, ref, watch } from 'vue';
import { useVehiculeStore } from '../../../../stores/Vehicule/vehicule-store';


const VehiculeStore = useVehiculeStore();
const { CreateVehiculeForm , v$CreateVehicule , edit }  = storeToRefs(VehiculeStore);
const props = defineProps(['show','loading']);
const emit = defineEmits(['toggleModal', 'createVehicule']);
const saveLabel = computed(() => (edit.value ? "Update" : "Save"));


</script>

<template>
    <BaseModel :show="props.show">
        <template #title> {{ edit ? 'Edit Vehicule' : 'Create Vehicule' }} </template>
        <template #body>
            <InputError :errors="v$CreateVehicule.name.$errors">
                <label for="Name">Name</label>
                <input v-model="CreateVehiculeForm.name" class=" mb-2 border rounded-md py-2 px-2 w-[100%]" type="text"
                    name="" id="" placeholder="Car Name">
            </InputError>
            <InputError :errors="v$CreateVehicule.model.$errors">
                <label for="Name">Model</label>
                <input v-model="CreateVehiculeForm.model" class=" mb-2 border rounded-md py-2 px-2 w-[100%]" type="text" name=""
                    id="" placeholder="Car Model">
            </InputError>
            <InputError :errors="v$CreateVehicule.price.$errors">
                <label for="price">Price</label>
                <input v-model="CreateVehiculeForm.price" class=" mb-2 border rounded-md py-2 px-2 w-[100%]" type="text" name=""
                    id="" placeholder="Car price">
            </InputError>
        </template>
        <template #footer>
            <button @click="emit('toggleModal')" class="mb-2 bg-red-700 text-white py-2 px-2 rounded-md shadow-sm">
                close
            </button>
            <button :disabled="props.loading" @click="VehiculeStore.CreateOrUpdateVehicule();"
                class="mb-2 bg-indigo-700 text-white py-2 px-2 rounded-md shadow-sm">
                {{loading? "saving ..." : saveLabel }}
            </button>
        </template>
    </BaseModel>
</template>