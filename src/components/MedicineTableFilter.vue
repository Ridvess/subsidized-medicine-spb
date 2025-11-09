<script setup>
import {defineEmits, reactive} from "vue";
import {getDistrictList} from "@/utils/getDistrictList"

const districtList = getDistrictList()

const emit = defineEmits(['searchMedicine'])

let search = reactive({
  district: null,
  storeName: null,
  storeAddress: null
})



</script>

<template>
  <div class="w-5/6 h-200px mx-10 border border-gray-300 rounded-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">

    <div class="p-4 border-b border-gray-200">
      <h2 class="text-xl font-bold text-gray-800">Фильтры</h2>
    </div>

    <div class="p-4 space-y-6">
      <div>
        <h3 class="text-lg font-medium text-gray-700 mb-2">Район</h3>
        <v-select :options="districtList" label="name" placeholder="Выберите район..."></v-select>
      </div>

      <div>
        <h3 class="text-lg font-medium text-gray-700 mb-2">Аптека</h3>
        <input class="block min-w-0 w-full py-1.5 pl-1 pr-3 placeholder:text-black outline-1 outline-gray-300 rounded" placeholder="Введите адрес или номер аптеки...">
      </div>

      <div class="flex space-x-3 pt-2">
        <button class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition duration-200">
          Сбросить
        </button>
      </div>
    </div>
  </div>
</template>

<style>
@import "vue-select/dist/vue-select.css";
</style>
