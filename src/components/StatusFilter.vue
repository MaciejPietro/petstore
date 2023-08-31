<template>
  <fieldset class="border border-gray-400 rounded-2xl px-8 py-4">
    <legend class="text-xl font-semibold leading-6 text-gray-900">
      Status
    </legend>
    <div class="flex gap-x-12 gap-y-4 flex-wrap">
      <div
        v-for="status in statuses"
        :key="status.value"
        class="relative flex items-start"
      >
        <div class="min-w-0 flex-1 text-sm leading-6">
          <label
            :for="`status-${status.value}`"
            class="font-medium text-gray-900 cursor-pointer"
            >{{ status.label }}</label
          >
        </div>
        <div class="ml-3 flex h-6 items-center">
          <input
            v-model="selectedStatus"
            :id="`status-${status.value}`"
            :name="`status-${status.value}`"
            :value="status.value"
            type="radio"
            class="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-transparent cursor-pointer"
          />
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup>
import statuses from "@/lib/pet/statuses";
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { petsActions } from "@/store/modules/pets";

const store = useStore();
const selectedStatus = ref(store.state.pets.filterStatus);

watch(
  () => selectedStatus.value,
  () => {
    store.dispatch(petsActions.SET_STATUS, selectedStatus.value);
    store.dispatch(petsActions.GET_PETS);
  }
);
</script>
