<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseenter="enterShow" @mouseleave="leaveShow">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <div class="sort" v-show="isShow">
        <div class="all-sort-list2" @click="goSearch">
          <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur: currentIndex == index}">
            <h3 @mouseenter="changeIndex(index)">
              <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
            </h3>
            <!--            二三级菜单-->
            <div class="item-list clearfix" :style="{display: currentIndex == index ? 'block' : 'none'}">
              <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                <dl class="fore">
                  <dt>
                    <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                  </dt>
                  <dd>
                    <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                      <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted,ref,reactive} from "vue";
import { useStore,mapState } from 'vuex';
import {useRouter,useRoute} from 'vue-router'
//引入 lodash 的全部函数
//import _ from 'lodash'
import throttle from 'lodash/throttle'

export default {
  name: "TypeNav",
  setup(){
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    let currentIndex = ref(-1)
    const changeIndex = throttle(function (index){
//      console.log(index)
      return  currentIndex.value = index
    },50)

    const goSearch = function (event){
      console.log(event.target.dataset)
      //只有 a 标签才有 categoryname 属性
      let {categoryname,category1id,category2id,category3id} = event.target.dataset
      if(categoryname){
          let location = reactive({name:'search'})
          let query = reactive({categoryName:categoryname})
        //一二三级分类的 a 标签
          if(category1id){
            query.category1Id = category1id
          }else if(category2id){
            query.category2Id = category2id
          }else {
            query.category3Id = category3id
          }
        console.log(location)
//        整理参数
        location.query = query
        if (route.params){
          location.params = route.params
        }
        router.push(location)
      }

    }

    const isShow = ref(true)

    const enterShow = function (){
//      if (route.path == '/home')
        isShow.value = true
    }

    const leaveShow = function (){
      currentIndex.value = -1
      if(route.path != '/home')
      isShow.value = ! isShow.value
    }


//组件挂载完毕获取服务器数据 ，此处需要派发一个 action(已经移到根组件的 onMounted)
    onMounted(()=>{
      //如果不是 home 组件就将三级联动隐藏
      if (route.path != '/home')
        isShow.value = false
    })
    return {
      currentIndex,changeIndex,goSearch,enterShow,leaveShow,isShow
    }
  },
  computed: {
    ...mapState({
      //使用该计算属性时，会立即执行一次右侧的函数，函数中的 state 参数代表大仓库
      categoryList: state => state.home.categoryList
    })
  }
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      cursor: pointer;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          //&:hover {
          //  .item-list {
          //    display: block;
          //  }
          //}
        }
        .cur{
          background: skyblue;
        }
      }
    }
  }
}
</style>
