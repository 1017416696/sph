<script setup>
import {computed, inject, onMounted, reactive, ref} from "vue";
const API = inject('$API')
let page = ref('1')
//每页显示数量
let limit = ref('3')
//let myOrder = reactive({
//  data:{}
//})
const myOrder = reactive({})

//let getData = async function(){
//  let result = await API.reqGetOrderList(page.value,limit.value)
//  if (result.code == 200){
//    myOrder.data = result.data
//  }
//}


//将当前页码page和每页显示数量 limit 发送给服务器，接收服务器返回的数据
let getData = async function(){
  let result = await API.reqGetOrderList(page.value,limit.value)
  if (result.code == 200){
    console.log(result.data)
    Object.assign(myOrder,result.data)
  }
}
onMounted(()=>{
  getData()
})

//获取点击的页码
const onPageChanged = function (currentPage){
  page.value = currentPage
  getData()
}
</script>

<template>
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
          <tr>
            <th width="29%">商品</th>
            <th width="31%">订单详情</th>
            <th width="13%">收货人</th>
            <th>金额</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
          </thead>
        </table>
      </div>
      <div class="orders">

        <table class="order-item" v-for="(record,index) in myOrder.records" :key="record.id">
          <thead>
          <tr>
            <th colspan="5">
                      <span class="ordertitle">{{record.createTime}}　订单编号：{{record.outTradeNo}} <span
                          class="pull-right delete"><img src="../images/delete.png"></span></span>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in record.orderDetailList" :key="item.id">
            <td width="60%">
              <div class="typographic">
                <img :src="item.imgUrl" style="width: 100px;height: 100px">
                <a href="#" class="block-text">包邮 {{item.skuName}}</a>
                <span>x{{item.skuNum}}</span>
                <a href="#" class="service">售后申请</a>
              </div>
            </td>
<!--            后面的列只需要展示索引值为0 的信息-->
            <td :rowspan="record.orderDetailList.length" v-show="index == 0" width="8%" class="center">{{record.consignee}}</td>
            <td :rowspan="record.orderDetailList.length" v-show="index == 0" width="13%" class="center">
              <ul class="unstyled">
                <li>总金额¥ {{(record && record.totalAmount) ? record.totalAmount.toFixed(2):0}}</li>
                <li>在线支付</li>
              </ul>
            </td>
            <td :rowspan="record.orderDetailList.length" v-show="index == 0" width="8%" class="center">
              <a href="#" class="btn">{{record.orderStatusName}} </a>
            </td>
            <td :rowspan="record.orderDetailList.length" v-show="index == 0" width="13%" class="center">
              <ul class="unstyled">
                <li>
                  <a target="_blank">评价|晒单</a>
                </li>
              </ul>
            </td>
          </tr>
          </tbody>
        </table>

      </div>
      <div class="choose-order">
        <Pagination :continues="5" :page-no="page" :page-size="limit" :total="myOrder.total" @pageChanged="onPageChanged"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index.vue"
}
</script>

<style lang="less" scoped>
</style>
