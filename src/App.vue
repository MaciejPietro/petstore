<template>
  <div id="app" class="flex flex-col items-center mt-24">
    <div class="w-full overflow-hidden">
      <img
        class="relative z-10 min-w-[780px] mx-auto"
        alt="pets"
        src="./assets/pets.png"
      />
    </div>
    <main class="text-red-500 bg-red-100 w-full py-24 -mt-20">
      <h1 class="text-2xl md:text-3xl font-bold text-center px-10">
        Welcome to pets store
      </h1>
      <PetsList />
    </main>
  </div>
</template>

<script setup>
import PetsList from "./components/PetsList.vue";
</script>
