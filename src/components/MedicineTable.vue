<script setup>
import {defineProps, onMounted, reactive, ref, watch} from "vue"
import {saveFavourite, checkFavourite} from "@/utils/useSaveFavourite";
import {PlusIcon, ChevronDownIcon, StarIcon} from "@heroicons/vue/16/solid"

const props = defineProps({response: Object})
let newData = reactive({
  result: {}
})
let newInstance = ref(true)

function prepareData(data) {
  newInstance = false
  newData.result = {}
  if (Object.keys(data).length === 0) return
  for (let key in data.result) {
    const entry = data.result[key]
    entry.isActive = false

    // eslint-disable-next-line no-prototype-builtins
    if (!newData.result.hasOwnProperty(entry.drugName))
      newData.result[entry.drugName] = {
        drugName: entry.drugName,
        isActive: false,
        storeList: []
      }

    newData.result[entry.drugName].storeList.push(entry)
  }


  return newData.result
}

watch(() => props.response, (response) => prepareData(response))
onMounted(() => {
  newInstance = true
})
</script>

<template>
  <div v-if="props.response && props.response.success && props.response.result" class="w-5/6 h-full my-1 overflow-auto">
    <div v-if="props.response.result.length">
      <div v-for="(value, key, index) in newData.result" :key="index">
        <div class="flex flex-col bg-white items-center p-3 m-1 outline outline-1 rounded-md outline-gray-300">
          <div class="flex flex-row justify-between w-full  cursor-pointer">
            <h4>{{ value.drugName }}</h4>
            <div class="flex flex-row justify-end w-1/6">
              <button
                  @click="saveFavourite('drug', value.drugName); this.$forceUpdate()"
                  class="flex items-center justify-center size-7 bg-blue-500 hover:bg-blue-700 text-white font-bold mx-1 p-2 rounded">
                <i>
                  <StarIcon :class="{'text-yellow-500': checkFavourite('drug', value.drugName )}" class="size-5 text-white-500"/>
                </i>
              </button>
              <button @click="value.isActive = !value.isActive"
                      class="flex items-center justify-center size-7 bg-blue-500 hover:bg-blue-700 text-white font-bold mx-1 p-2 rounded">
                <i>
                  <ChevronDownIcon class="size-5 text-white-500"/>
                </i></button>
            </div>
          </div>
          <div v-bind:class="{hidden: !value.isActive}" class="flex flex-col justify-between items-center w-full p-2 m-1 bg-gray cursor-pointer">
            <div v-for="(store, itemIndex, index) in value.storeList"
                 :key="index"
                 class="flex w-full flex-col items-center justify-center"
                 @click="store.isActive = !store.isActive;">
              <div class="flex flex-col w-full p-2 m-1 outline outline-1 rounded-md outline-gray-300 hover:bg-gray-200">
                <div class="flex flex-row justify-start w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-store w-5 h-5 text-blue-500 mt-0.5" __v0_r="0,11066,11096"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path><path d="M2 7h20"></path><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"></path></svg>
                    <h5 class="font-bold">&nbsp;{{ store.storeName }} </h5>
                </div>
                <span class="">{{ store.storeAddress }} {{ store.storeDistrict ? '(' + store.storeDistrict + ')' : '' }} </span>
                <span v-if="!store.isActive">В наличии: <span :class="[store.regionalCount > 0 ? 'text-green-600' : 'text-red-600']">рег. квота - {{store.regionalCount}} </span>, <span :class="[store.federalCount > 0 ? 'text-green-600' : 'text-red-600']">фед. квота - {{store.federalCount}}</span></span>
                <div v-bind:class="{hidden: !store.isActive}" class="flex flex-row justify-between items-center w-full bg-gray cursor-pointer">
                  <div  class="w-full flex flex-col">
                    <span>
                      <div class="">Ближайшее метро: {{ store.storeSubway ?  store.storeSubway : 'Нет данных' }}</div>
                    </span>

                    <span v-if="store.isActive">
                      <div class="">Региональная квота: <span :class="[store.regionalCount > 0 ? 'text-green-600' : 'text-red-600']">{{ store.regionalCount }}</span></div>
                      <div class="">Федеральная квота: <span :class="[store.federalCount > 0 ? 'text-green-600' : 'text-red-600']">{{ store.federalCount }}</span></div>
                    </span>
                  </div>

                  <div class="flex flex-col">
                    <button
                        @click.stop="saveFavourite('store', store.storeName); this.$forceUpdate()"
                        class="flex items-center justify-center size-7 bg-blue-500 hover:bg-blue-700 text-white font-bold mx-1 p-2 rounded">
                      <i>
                        <!--                  TODO recolor star-->
                        <StarIcon :class="{'text-yellow-500': checkFavourite('store', store.storeName)}" class="size-5 text-white-500"/>
                      </i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col bg-white items-center p-3 m-1 outline outline-1 rounded-md outline-gray-300">
      <h2 class="text-2xl">Нет данных</h2>
    </div>
  </div>

</template>
