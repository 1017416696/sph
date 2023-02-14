<script setup>
import {ref,reactive,watch,nextTick} from 'vue'
import Swiper from 'swiper'
const cur = ref(null)
const props = defineProps({
  carouselList:{
    type: Array
  }
})
watch(()=>props.carouselList,()=>{
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
      <div class="swiper-slide" v-for="(carousel,index) in props.carouselList" :key="carousel.id">
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
  name: "Carousel"
}
</script>

<style scoped>

</style>
