<script setup>
import {onMounted,computed,ref,nextTick} from 'vue'
import {useStore} from 'vuex'
import throttle from 'lodash/throttle'
const store = useStore()
const getData = function (){
  store.dispatch('shopCartList')
}
const carInfo = computed(()=>{
  return store.getters.cartList.cartInfoList || []
})

//全选框控制小复选框
const checkAll = async function (event){
  let isChecked = event.target.checked ? '1':'0'
  try {
    await store.dispatch('updateAllCartChecked',isChecked)
    getData()
  }catch (e){
    alert(e.message)
  }
}

const handler = throttle(async function (type,disNum,cartIn){
  // type 接收两种类型，一个是变化后的值，一个是最后展示在输入框中的个数
//  console.log(type,disNum,cartIn)
  switch (type){
    case "plus":
      disNum = 1
      break
    case "minus":
      disNum = cartIn.skuNum > 1 ? -1 : 0
      break
    case "change":
      //用户输入的是非法的，带给服务器的 skuNum为0
      if (isNaN(disNum) || disNum < 1){
        disNum = 0
      }else {
        disNum = Math.floor(disNum) - cartIn.skuNum
      }
  }
  console.log(type,disNum)
  try {
    await store.dispatch('addOrUpdateShopCart',{skuId:cartIn.skuId,skuNum:disNum})
    getData()
  }catch (error){

  }
},1000)

const isAllChecked = computed(()=>{
  return carInfo.value.every(item=>item.isChecked == 1)
})

//购物车中选中的商品列表
const newArr = computed(()=>{
  return carInfo.value.filter(item=>item.isChecked == 1)
})
//商品的总数
const totalNum = computed(()=>{
  return newArr.value.length
})
//计算商品总的金额
const totalPrice = computed(()=>{
//  let newArr = carInfo.value.filter(item=>item.isChecked == 1)
  return  newArr.value.reduce((accumulator,currentValue)=>{
    accumulator += currentValue.skuNum * currentValue.skuPrice
    return accumulator
  },0)
})


//删除购物车产品
const deleteCart = async function (skuId){
  try {
    let result = await store.dispatch('deleteCart',skuId)
//    console.log(result)
    getData()
  }catch (error){
    error.message
  }
}

//更改产品选中状态
const updateCart = async function (skuId,isChecked){
  try {
    let result = await store.dispatch('updateCart',{skuId,isChecked:isChecked == 1?0:1})
    console.log(result)
    getData()
  }catch (e){

  }
}

//删除选中的商品
const deleteCheckedCart = async function (){
  try {
    await store.dispatch('deleteCheckedCart')
    getData()
  }catch (error){
    alert(error.message)
  }
}
onMounted(()=>{
  getData()
})
</script>

<template>
  <div class="cart" v-show="carInfo.length>0">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cartIn,index) in carInfo" :key="cartIn.id">
            <li class="cart-list-con1">
              <input type="checkbox" ref="chk_list" :checked="cartIn.isChecked == 1" @change="updateCart(cartIn.skuId,cartIn.isChecked)">
            </li>
            <li class="cart-list-con2">
              <img :src="cartIn.imgUrl">
              <div class="item-msg" >{{cartIn.skuName}}</div>
            </li>
            <li class="cart-list-con4">
              <span class="price">¥ {{cartIn.cartPrice.toFixed(2)}}</span>
            </li>

            <li class="cart-list-con5">
              <a class="mins" @click="handler('minus',-1,cartIn)">-</a>
              <input
                  autocomplete="off"
                  type="text"
                  minnum="1"
                  class="itxt"
                  :value="cartIn.skuNum"
                  @change="handler('change',$event.target.value,cartIn)"
              >
              <a class="plus" @click="handler('plus',1,cartIn)">+</a>
            </li>

            <li class="cart-list-con6">
              <span class="sum">¥ {{(cartIn.cartPrice * cartIn.skuNum).toFixed(2)}}</span>
            </li>
            <li class="cart-list-con7">
              <a @click="deleteCart(cartIn.skuId)" class="sindelet">删除</a>
              <br>
              <a href="#none">移到收藏</a>
            </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" @change="checkAll" ref="chk_all" :checked="isAllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{totalNum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费):</em>
          <i class="summoney">¥ {{totalPrice.toFixed(2)}} 元</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
  <div class="cart" v-show="carInfo.length == 0" style="height: 220px;text-align: center;">
    购物车空空的哦~，去看看心仪的商品吧~
    <router-link :to="{name:'search'}" style="font-weight: bold;font-size:20px;color: red">
      去购物
    </router-link>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
  export default {
    name: 'ShopCart',
    computed:{
      ...mapGetters(['cartList'])
    }
  }

</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }


          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 14px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>

