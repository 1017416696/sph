<script setup>
import {onMounted,computed,ref} from 'vue'
import eventBus from "@/bus/eventBus.js";
const props = defineProps(['skuImageList'])
const currentIndex = ref(0)
const imgObj = computed(()=> props.skuImageList[currentIndex.value] || {})

const big = ref(null)
const mask = ref(null)
const handler = function (e){
  let x = e.offsetX - mask.value.offsetWidth/2
  let y = e.offsetY - mask.value.offsetHeight/2
  if (x < 0) x = 0
  if (x > mask.value.offsetWidth) x = mask.value.offsetWidth
  if (y < 0) y = 0
  if (y > mask.value.offsetHeight) y = mask.value.offsetHeight

  mask.value.style.left = x + 'px'
  mask.value.style.top = y + 'px'

  big.value.style.left = -2 * x + 'px'
  big.value.style.top = -2 * y + 'px'
}

onMounted(()=>{
  eventBus.on('sendIndex',(payload)=>{
    console.log(payload)
    currentIndex.value = payload
  })
})
</script>

<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl"/>
    <div class="event" @mousemove="handler"></div>
    <div class="big" >
      <img :src="imgObj.imgUrl" ref="big"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>
