<script setup>
import {ref,reactive} from "vue";
import {useRoute, useRouter} from "vue-router";
import {Lock,User} from "@element-plus/icons-vue";
import {useStore} from "vuex";


const router = useRouter()
const route = useRoute()
const store = useStore()
//const username = ref('')
//const password = ref('')
//处理登陆
//const handleLogin = async function (){
//  try {
//    (username.value && password.value) && await store.dispatch('getLoginUser',{phone:username.value,password:password.value})
//    let path = route.query.redirect ? route.query.redirect : '/home'
//    router.push(path)
//  }catch (e){
//    alert(e.message)
//  }
//}

//加载动画
const loading = ref(false)
//获取表单DOM 元素
const ruleFormRef = ref(null)
const formSize = ref('default')

//表单中的数据，进行双向绑定的表单数据
const ruleForm = reactive({
  username:'',
  password:''
})

//表单各字段的验证规则，<el-form-item > 标签中的 prop属性的值为该对象中的属性
const rules = reactive({
  username:[
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password:[
    { required: true, message: '请输入密码', trigger: 'blur' },
  ]
})

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!');
      try {
        await store.dispatch('getLoginUser',{phone:ruleForm.username,password:ruleForm.password})
        let path = route.query.redirect ? route.query.redirect : '/home'
        loading.value = true
        router.push(path)
      }catch (e){
        ElMessage.error('用户名或密码错误')
      }
    } else {
      console.log('error submit!', fields);
//      ElMessage.error('用户名')
    }
  });
};


</script>

<template>
  <div class="login-container">
    <!-- 登录 -->
    <div class="login-wrap">
      <div class="login">
        <div class="loginform">
          <ul class="tab clearFix">
            <li>
              <a href="##" style="border-right: 0;">扫描登录</a>
            </li>
            <li>
              <a href="##" class="current">账户登录</a>
            </li>
          </ul>

          <div class="content">
            <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                label-width="120px"
                class="demo-ruleForm"
                :size="formSize"
                status-icon
            >
              <div class="input-text clearFix">
<!--                <span></span>-->
<!--                <input type="text" placeholder="邮箱/用户名/手机号" v-model="username">-->
<!--                验证表单数据对象中的 username 属性-->
                <el-form-item label-width="auto" prop="username">
                  <el-input
                      v-model="ruleForm.username"
                      placeholder="邮箱/用户名/手机号"
                      autocomplete="on"
                      name="username"
                      :prefix-icon='User'
                  />
                </el-form-item>
              </div>
              <div class="input-text clearFix">
<!--                <span class="pwd"></span>-->
<!--                <input type="password" placeholder="请输入密码" v-model="password">-->
                <!--                验证表单数据对象中的 password 字段-->
                <el-form-item label-width="auto" prop="password">
                  <el-input
                      v-model="ruleForm.password"
                      type="password"
                      placeholder="请输入密码"
                      show-password
                      :prefix-icon='Lock'
                      autocomplete="current-password"
                  />
                </el-form-item>
              </div>
              <div class="setting clearFix">
                <label class="checkbox inline">
                  <input name="m1" type="checkbox" value="2" checked>
                  自动登录
                </label>
                <span class="forget">忘记密码？</span>
              </div>
<!--              @click="submitForm(ruleFormRef)-->
<!--              v-loading 是否显示加载动画-->
              <el-button class="btn" type="primary" v-loading="loading" @click="submitForm(ruleFormRef)">登录</el-button>
            </el-form>

            <div class="tips">
              <span style="margin-right:20px;">username: 13700000000</span>
              <span> password: 111111</span>
            </div>

            <div class="call clearFix">
              <ul>
                <li><img src="./images/qq.png" alt=""></li>
                <li><img src="./images/sina.png" alt=""></li>
                <li><img src="./images/ali.png" alt=""></li>
                <li><img src="./images/weixin.png" alt=""></li>
              </ul>
              <router-link class="register" to="/register">立即注册</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
  }
</script>

<style lang="less" scoped>
  .login-container {
    .login-wrap {
      height: 487px;
      background-color: #e93854;

      .login {
        width: 1200px;
        height: 487px;
        margin: 0 auto;
        background: url(./images/loginbg.png) no-repeat;
      }

      .loginform {
        width: 420px;
        height: 406px;
        box-sizing: border-box;
        background: #fff;
        float: right;
        top: 45px;
        position: relative;
        padding: 20px;

        .tab {

          li {
            width: 50%;
            float: left;
            text-align: center;

            a {
              width: 100%;
              display: block;
              height: 50px;
              line-height: 50px;
              font-size: 20px;
              font-weight: 700;
              color: #333;
              border: 1px solid #ddd;
              box-sizing: border-box;
              text-decoration: none;

            }

            .current {
              border-bottom: none;
              border-top-color: #28a3ef;
              color: #e1251b;
            }
          }
        }

        .content {
          width: 380px;
          height: 316px;
          box-sizing: border-box;
          border: 1px solid #ddd;
          border-top: none;
          padding: 18px;

          form {
            margin: 15px 0 18px 0;
            font-size: 12px;
            line-height: 18px;

            .input-text {
              margin-bottom: 16px;

              span {

                float: left;
                width: 37px;
                height: 32px;
                border: 1px solid #ccc;
                background: url(@/assets/images/icons.png) no-repeat -10px -201px;
                box-sizing: border-box;
                border-radius: 2px 0 0 2px;
              }

              .pwd {
                background-position: -72px -201px;
              }

              input {
                width: 302px;
                height: 32px;
                box-sizing: border-box;
                border: 1px solid #ccc;
                border-left: none;
                float: left;
                padding-top: 6px;
                padding-bottom: 6px;
                font-size: 14px;
                line-height: 22px;
                padding-right: 8px;
                padding-left: 8px;

                border-radius: 0 2px 2px 0;
                outline: none;
              }
            }

            .setting {
              label {
                float: left;
              }

              .forget {
                float: right;
              }
            }

            .btn {
              background-color: #e1251b;
              padding: 6px;
              border-radius: 0;
              font-size: 16px;
              font-family: 微软雅黑;
              word-spacing: 4px;
              border: 1px solid #e1251b;
              color: #fff;
              width: 100%;
              height: 36px;
              margin-top: 25px;
              outline: none;
            }
          }

          .call {
            margin-top: 30px;

            ul {
              float: left;

              li {
                float: left;
                margin-right: 5px;
              }
            }

            .register {
              float: right;
              font-size: 15px;
              line-height: 38px;
            }

            .register:hover {
              color: #4cb9fc;
              text-decoration: underline;
            }
          }

        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }

  }
</style>
