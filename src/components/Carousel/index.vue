<script setup>
import {ref,watch,nextTick} from 'vue'
import Swiper from 'swiper'
const cur = ref(null)
watch(list,()=>{
  nextTick(()=>{
    const mySwiper = new Swiper (cur.value, {
      loop: true, // 循环模式选项

      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
        clickable:true
      },

      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // 如果需要滚动条
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    })
  })
},{immediate:true})

</script>

<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel,index) in list" :key="carousel.id">
        <img :src="carousel.imgUrl"/>
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>

export default {
  name: "Carousel",
  props:{
    carouselList:{
      type: Array
    }
  },
  setup(props){
    const cur = ref(null)
    const list = props.carouselList
    watch(list,()=>{
      nextTick(()=>{
        const mySwiper = new Swiper (cur.value, {
          loop: true, // 循环模式选项

          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
            clickable:true
          },

          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },

          // 如果需要滚动条
          scrollbar: {
            el: '.swiper-scrollbar',
          },
        })
      })
    },{immediate:true})


    return{
      cur,list
    }
  }
}
</script>

<style scoped>

</style>
