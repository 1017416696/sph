<script setup>
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {onMounted,ref} from 'vue'

const route = useRoute()
const store = useStore()


onMounted(()=>{
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
