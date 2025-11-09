<script setup>
  import {ref, defineEmits} from "vue"
  import {getMedicineURL} from "@/utils/getMedicineURL"
  import {getDistrictList} from "@/utils/getDistrictList"

  const districtList = getDistrictList()
  const favouriteStoreList = getStoreList()
  const favouriteDrugList = getDrugList()
  const emit = defineEmits(['searchMedicine'])

  let medicine = ref('')
  let district = ref('')
  let store = ref('')

  function getStoreList() {
    return JSON.parse(localStorage.getItem('store'))
  }

  function getDrugList() {
    return JSON.parse(localStorage.getItem('drug'))
  }

  function searchFavouriteMedicine() {
    let result = getMedicineURL(medicine.value, store.value, district.value.name)
    emit('searchMedicine', result)
  }

  function clearFilters() {
    medicine.value = ''
    store.value = ''
    district.value = ''
  }
</script>

<template>
  <div class="w-5/6">
    <div class="w-full h-200px p-4 border border-gray-300 rounded-md mx-auto bg-white shadow-md ">
      <label class="text-lg font-medium text-gray-700 mb-2">Аптека</label>
      <v-select v-model="store" :options="favouriteStoreList" placeholder="Введите адрес или номер аптеки" class="mb-2"></v-select>
      <label class="text-lg font-medium text-gray-700 mb-2">Льготное лекарство</label>
      <v-select v-model="medicine" :options="favouriteDrugList"  placeholder="Введите название лекарства" class="mb-2"></v-select>
      <label class="text-lg font-medium text-gray-700 mb-2">Район</label>
      <v-select v-model="district" :options="districtList" label="name" placeholder="Введите район" class="mb-2"></v-select>

      <div class="flex flex-row justify-stretch">
        <button @click="searchFavouriteMedicine" :disabled="medicine === '' && medicine.length < 3" class="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-4 mx-1 rounded disabled:cursor-not-allowed disabled:bg-grey-30 disabled:opacity-50">Найти</button>
        <button @click="clearFilters" class="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 mx-1 w-full rounded">Сбросить</button>
      </div>
    </div>
  </div>
</template>
