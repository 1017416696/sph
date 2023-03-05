<script setup>
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {onMounted,ref} from 'vue'

const route = useRoute()
const store = useStore()


onMounted(()=>{
  // Home 组件和 Search 组件都需要该数据，所以直接在根组件中加载一次即可
  store.dispatch("categoryList")
})
</script>

<template>
  <Header/>
  <router-view/>
  <Footer v-show="route.meta.show"/>
</template>

<style scoped>
</style>
