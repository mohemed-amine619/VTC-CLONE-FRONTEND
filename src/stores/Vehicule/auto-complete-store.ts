import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";
import { getUserData } from "../../helper/utils";




export const UseAutoCompleteStore = defineStore('auto-complete-store', () => {
    const queryDestination = ref('');
    const showSuggestionDestination = ref(false)

    const queryLocation = ref('');
    const showSuggestionLocation = ref(false)

    return {
        queryDestination,
        queryLocation,
        showSuggestionDestination,
        showSuggestionLocation
    }
    
})

if (import.meta.hot) {
    import.meta.hot.accept(
        acceptHMRUpdate(UseAutoCompleteStore, import.meta.hot)
    );
}

