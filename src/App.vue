<script>
import MainHeader from './components/MainHeader.vue'
import SearchMedicine from './components/SearchMedicine.vue'

export default {
  name: 'App',
  components: {
    MainHeader,
    SearchMedicine,
  }
}
</script>

<template>
  <MainHeader/>
  <SearchMedicine/>
</template>

<style src="./style.css">
</style>
