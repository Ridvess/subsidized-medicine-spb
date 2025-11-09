<script setup>
  import FavouriteTableMenu from './FavouriteTableMenu'
  import MedicineTable from './MedicineTable'
  import {reactive} from "vue";

  let data = reactive({
    response: {}
  })

  async function searchMedicine(resp) {
    let response = {}
    data.response = {}
    response = await (await fetch(resp)).json()
    data.response = response
  }
</script>

<template>
    <FavouriteTableMenu @search-medicine="searchMedicine"></FavouriteTableMenu>
    <MedicineTable :response="data.response"></MedicineTable>
</template>
