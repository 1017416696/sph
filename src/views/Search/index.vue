<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
<!--          面包屑-->
          <ul class="fl sui-tag">
<!--            分类面包屑-->
            <li class="with-x" v-show="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
<!--            关键字面包屑-->
            <li class="with-x" v-show="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
<!--            品牌信息面包屑-->
            <li class="with-x" v-show="searchParams.trademark">{{searchParams.trademark}}<i @click="removeTrademark">×</i></li>
<!--            售卖属性面包屑-->
            <li class="with-x" v-for="(prop,index) in searchParams.props" :key="index">{{prop.split(":")[1]}}<i @click="removeProps(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
<!--        todo 自定义事件-->
<!--        trademarkInfo 面包屑-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter" >
              <ul class="sui-nav" >
                <li :class="{active:isActive == '1'}" @click="changeOrder('1')">
                  <a>综合<span v-show="isActive == '1'"><span v-show="isShow == 'asc'">⬆</span><span v-show="isShow == 'desc'">⬇</span></span></a>
                </li>
                <li :class="{active:isActive == '2'}" @click="changeOrder('2')">
                  <a>价格<span v-show="isActive == '2'"><span v-show="isShow == 'asc'">⬆</span><span v-show="isShow == 'desc'">⬇</span></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods,index) in goodsList" :key="goods.id">
                <div class="list-wrap">

                  <div class="p-img">
                    <router-link :to="{
                      name:'Detail',
                      params:{
                        skuid:goods.id
                      }
                    }">
<!--                      lazyload 插件提供的自定义指令-->
                      <img v-lazy="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="
                    {
                      name:'Detail',
                      params:{
                        skuid:goods.id
                      }
                    }">{{goods.title}}</router-link>
                  </div>

                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a @click="addToShopCart(goods.id)" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
<!--          分页器-->
<!--           todo 自定义事件 page-changed-->
          <Pagination
              :page-no="searchParams.pageNo"
              :page-size="searchParams.pageSize"
              :total="total"
              :continues="5"
              @page-changed="onPageChanged"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "@/views/Search/SearchSelector/SearchSelector.vue";
import {onMounted,reactive,computed,onBeforeMount,watch} from "vue"
import {useStore,mapGetters,mapState} from 'vuex'
import {useRoute,useRouter} from 'vue-router'
import eventBus from "@/bus/eventBus.js";
export default {
  name: 'Search',
  components: {
    SearchSelector
  },
  computed:{
    ...mapGetters(['goodsList']),
    ...mapState({
      total: state => state.search.searchInfoList.total
    })
  },
  setup(){
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const searchParams = reactive({
      "category1Id": "",
      "category2Id": "",
      "category3Id": "",
      "categoryName": "",
      "keyword": "",
      "order": "1:desc",
      "pageNo": 1,
      "pageSize": 10,
      "props": [],
      "trademark": ""

    })
    const searchInfoList = function (){
      store.dispatch('searchInfoList',searchParams)
    }

    const removeCategoryName = function (){
      searchParams.category1Id = undefined
      searchParams.category2Id = undefined
      searchParams.category3Id = undefined
      searchParams.categoryName = undefined
      searchInfoList()
      //改变地址栏，删除 query 参数，但需要保留params参数
      if(route.params){
        router.push({
          name:'search',
          params:route.params
        })
      }
    }

    const removeKeyword = function (){
      searchParams.keyword = undefined
      // todo 事件总线
      eventBus.emit('clear')
      searchInfoList()
      if (route.query){
        router.push({
          name:'search',
          query:route.query
        })
      }
    }

    const removeTrademark = function (){
      searchParams.trademark = undefined
      searchInfoList()
    }

    const removeProps = function (index){
      console.log(index)
      searchParams.props.splice(index,1)
      searchInfoList()
    }

    const trademarkInfo = function (trademark){
      console.log(trademark)
      //整理参数
      searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      //再次发送请求
      searchInfoList()
      searchParams.trademark =  searchParams.trademark.split(':')[1]
    }

    const attrInfo = function (attr,attrValue){
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
      // props 是一个数组 ，需要将整理好的字符串放入到 props 数组中
      //数组去重
      if (searchParams.props.indexOf(props) == -1){
        searchParams.props.push(props)
      }
      searchInfoList()
    }

    const isActive = computed(()=>{
//      console.log(searchParams.order)
      return searchParams.order.split(":")[0]
    })

    const isShow = computed(()=>{
//      console.log(searchParams.order)
      return searchParams.order.split(":")[1]
    })

    const changeOrder = function (flag){
      console.log(flag)
      let originFlag = isActive.value
      let originSort = isShow
      let order = ''
//      console.log(originFlag,originSort)
      if (flag == originFlag){
        order = `${originFlag}:${originSort.value == 'desc' ? 'asc' : 'desc'}`
      }else{
        order = `${flag}:${'desc'}`
      }
      searchParams.order = order
      searchInfoList()
    }

    const onPageChanged = function (currentPage){
      searchParams.pageNo = currentPage
      searchInfoList()
    }

    // 直接加入购物车
    // skuId == goods.id
    const addToShopCart = async function (skuId){
      try {
        let result = await store.dispatch('addOrUpdateShopCart',{skuId,skuNum:1})
        ElMessage({
          message: '成功加入购物车.',
          type: 'success',
        })
      }catch (e){
        alert(e.message)
      }
    }

    onBeforeMount(()=>{
      Object.assign(searchParams,route.query,route.params)
    })
    onMounted(()=>{
      searchInfoList()
    })
    watch([()=>route.query,()=>route.params],()=>{
      //监视到路由变化后再次整理请求参数
      Object.assign(searchParams,route.query,route.params)
      searchInfoList()
      //每一次请求完之后将 categoryId 的一二三级分类都置空
      searchParams.category1Id = undefined
      searchParams.category2Id = undefined
      searchParams.category3Id = undefined
    })
    return{
      searchParams,removeCategoryName,removeKeyword,removeTrademark,removeProps,trademarkInfo,attrInfo,isActive,isShow,changeOrder,onPageChanged,addToShopCart
    }
  }
}
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>
