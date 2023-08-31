<template>
  <div class="max-w-3xl px-4 md:px-8 mx-auto mt-12">
    <div>
      <StatusFilter />
    </div>

    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Status
                </th>

                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200" v-if="pets && pets.length">
              <tr v-for="(pet, idx) in pets" :key="`${pet.id}-${idx}`">
                <td
                  class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 capitalize"
                >
                  {{ pet.name }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ pet.status }}
                </td>

                <td
                  class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
                >
                  <button
                    @click="onBuyClick(pet.id)"
                    class="text-red-600 hover:text-red-900"
                    :class="{
                      'pointer-events-none opacity-25':
                        pet.status !== 'available',
                    }"
                  >
                    Buy<span class="sr-only">, {{ pet.name }}</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <teleport to="body">
      <ConfirmPurchase
        :isActive="purchasePopupActive"
        :petId="purchasePopupPetId"
        @close="onPurchasePopupClose"
      />
    </teleport>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted, computed, ref } from "vue";
import StatusFilter from "@/components/StatusFilter";
import ConfirmPurchase from "@/components/ConfirmPurchase";

import { petsActions } from "@/store/modules/pets";

const store = useStore();

const fetchPetsData = () => {
  store.dispatch(petsActions.GET_PETS);
};

onMounted(() => {
  fetchPetsData();
});
const pets = computed(() => store.state.pets?.pets);

const purchasePopupActive = ref(false);
const purchasePopupPetId = ref(null);

const onPurchasePopupClose = () => {
  purchasePopupActive.value = false;
  purchasePopupPetId.value = null;
};

const onBuyClick = (petId) => {
  purchasePopupActive.value = true;
  purchasePopupPetId.value = petId;
};
</script>
