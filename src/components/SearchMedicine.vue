<script setup>
import {ref, reactive} from 'vue'
import {getMedicineURL} from "@/utils/getMedicineURL";
import MedicineTable from './MedicineTable.vue'
import MedicineTableFilter from './MedicineTableFilter.vue'
import FavouriteTable from "@/components/FavouriteTable";

const medicine = ref('')
let showFilters = ref(false)
let tab = ref('search')
let result = reactive({
  response: {}
})

async function getMedicine() {
  const medicineAPISearch = getMedicineURL(medicine.value, '', '')

  const resp = await (await fetch(medicineAPISearch)).json()
  result.response = resp
}


function searchMedicine() {
  console.log(medicine, medicine.value && medicine.value.length < 3 )
  getMedicine()
}

</script>

<template>

  <div class="flex flex-col bg-gray-50 w-full min-h-[100vh] p-4 space-y-3 items-center">
    <div>
      <h2 class="text-xl">{{tab === 'search' ? 'Поиск лекарств' : 'Сохраненные лекарства'}}</h2>
    </div>

    <div class="w-5/6 flex justify-center">
      <div class="w-5/6 flex flex-row justify-stretch space-x-2 rounded bg-gray-20">
        <button @click="tab = 'search'" v-bind:class="[tab === 'search' ? 'bg-white outline-indigo-600' : 'bg-gray-200 outline-gray-300']" class="flex-1 outline-1  text-black w-md hover:cursor-pointer py-2 px-4 rounded">Поиск лекарств</button>
        <button @click="tab = 'favourite'" v-bind:class="[tab === 'favourite' ? 'bg-white outline-indigo-600' : 'bg-gray-200 outline-gray-300']"  class="flex-1 outline-1 text-black w-md hover:cursor-pointer py-2 px-4 rounded">Сохраненные лекарства</button>
      </div>
    </div>

    <div v-if="tab === 'search'" class="w-5/6 flex flex-col items-center space-y-3 space-x-2">
      <div class="w-5/6 flex flex-row space-x-2">
        <div class="flex w-5/6 items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
          <input v-model="medicine" type="text" placeholder="Введите название лекарства..."
                 class="block min-w-0 w-full py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6">
        </div>
        <button @click="searchMedicine" :disabled="medicine.length < 3" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:cursor-not-allowed disabled:bg-grey-30 disabled:opacity-50">
          Поиск
        </button>

        <button @click="showFilters = !showFilters"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Фильтры
        </button>
      </div>

      <MedicineTableFilter v-if="showFilters"></MedicineTableFilter>

      <MedicineTable :response="result.response"></MedicineTable>
    </div>
    <div v-else class="w-5/6 flex flex-col items-center space-y-3 space-x-2">
      <FavouriteTable></FavouriteTable>
    </div>

  </div>

</template>

<style>
/*TODO maybe use this for background*/
.background-image {
  background-color: #f9f9f9;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23bfbfbf' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
