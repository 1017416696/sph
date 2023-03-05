<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="changePage(pageNo - 1)">上一页</button>
<!--    这个1时而显示，时而隐藏-->
    <button v-show="continuePage.start> 1" @click="changePage(1)"  :class="{active:pageNo == 1}">1</button>
    <button v-show="continuePage.start > 2" @click="changePage(2)" :class="{active:pageNo == 2}">2</button>
    <button v-show="continuePage.start > 3">···</button>

    <button
        v-for="(page,index) in continuePage.end"
        :key="index"
        v-show="page >= continuePage.start"
        @click="changePage(page)"
        :class="{active:pageNo == page}"
    >{{page}}</button>

    <button v-show="continuePage.end < totalPage -1">···</button>
    <button v-show="continuePage.end < totalPage" @click="changePage(totalPage)" :class="{active:pageNo == totalPage}">{{totalPage}}</button>
<!--    当前页为最后一页时禁用下一页按钮-->
    <button :disabled="pageNo == totalPage" @click="changePage(pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
}
</script>

<script setup>
import {computed} from 'vue'
const props = defineProps(['pageNo','pageSize','total','continues'])
const totalPage = computed(()=> Math.ceil(props.total/props.pageSize))

//连续的页数
const continuePage = computed(()=>{
  let start = 0,end = 0

  //总的页码达不到分页器的连续最小页码
  if (props.continues > totalPage){
    start = 1
    end = totalPage
  }else{
    start = props.pageNo - Math.floor(props.continues / 2)
    end = props.pageNo + Math.floor(props.continues / 2)
    //考虑当前页码为前两页的情况
    if (start < 1){
      start = 1
      end = props.continues
    }
    if (end > totalPage.value){
      end = totalPage.value
      start = totalPage.value - props.continues + 1
    }
  }
  return {start,end}
})

// todo 触发自定义事件
const emit = defineEmits(['pageChanged'])
const changePage = function (currentPage){
  console.log(currentPage)
  emit('pageChanged',currentPage)
}

</script>
<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active{
  background: skyblue;
}
</style>
