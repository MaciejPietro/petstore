<template>
  <div
    v-if="isActive"
    class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-20"
  >
    <div
      @click="emit('close')"
      class="absolute bg-black opacity-70 inset-0 z-0"
    ></div>
    <div
      class="w-full max-w-lg p-3 relative my-auto rounded-xl shadow-lg bg-white mx-4"
    >
      <div>
        <div class="text-center p-3 flex-auto justify-center leading-6">
          <h2 class="text-2xl font-bold py-4">Purchase info</h2>
          <p class="text-md text-gray-500 px-8">
            Are you sure you want purchase this pet?
          </p>

          <div class="mt-4 flex flex-col gap-2 w-64 mx-auto">
            Quantity
            <input
              class="ml-2"
              type="number"
              name="quantity"
              v-model="state.quantity"
              :min="1"
              :max="10"
            />
          </div>

          <div class="mt-4 flex flex-col gap-2 w-64 mx-auto">
            Shipping date
            <input class="ml-2" type="date" name="date" v-model="state.date" />
          </div>
        </div>
        <div class="p-3 mt-2 text-center space-x-4 md:block">
          <button
            @click="emit('close')"
            class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-md hover:shadow-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            @click="purchasePet()"
            class="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-red-600"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { purchasePet as postPurchasePet } from "@/api/lib/pets";
import { toast } from "vue3-toastify";

const props = defineProps({
  isActive: Boolean,
  petId: [Number, null],
});
const emit = defineEmits(["close"]);

const state = reactive({
  quantity: 1,
  date: new Date().toISOString().substr(0, 10),
});

const validateDate = () => {
  const date = new Date(state.date);

  const selectedDate = Date.parse(date);
  const today = Date.parse(new Date());

  if (selectedDate <= today) {
    toast("Shipping date must be future date", {
      autoClose: 1000,
    });
    return;
  }

  return true;
};

const purchasePet = async () => {
  if (!validateDate()) return;

  try {
    const res = await postPurchasePet({
      id: props.petId,
      quantity: state.quantity,
      shipDate: new Date(state.date).toISOString(),
    });

    if (res.status === 200) {
      toast("Pet was purchased", {
        autoClose: 1000,
      });
      emit("close");
    }
  } catch (err) {
    toast("Something went wrong", {
      autoClose: 1000,
    });
    throw err;
  }
};
</script>
