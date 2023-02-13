<template>
  <TypeNav/>
  <ListContainer/>
  <Recommand/>
  <Rank/>
  <Like/>
  <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
  <Brand/>
</template>

<script>
import ListContainer from "@/views/Home/ListContainer/index.vue";
import Recommand from "@/views/Home/Recommand/index.vue";
import Rank from "@/views/Home/Rank/index.vue";
import Like from "@/views/Home/Like/index.vue";
import Floor from "@/views/Home/Floor/index.vue";
import Brand from "@/views/Home/Brand/index.vue";
import {useStore} from 'vuex'
import {onMounted,computed} from 'vue'

export default {
  name: "index",
  components:{
    ListContainer,Recommand,Rank,Like,Floor,Brand
  },
  setup(){
    const store = useStore()
    const floorList = computed(()=> store.state.home.floorList)
    onMounted(()=>{
      store.dispatch('floorList')
    })
    return{
      floorList
    }
  }
}
</script>


<style scoped>

</style>
