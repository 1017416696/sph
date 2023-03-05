<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
const router = useRouter()
const store = useStore()
const phoneNum = ref('')
const code = ref('')
const password =ref('')
const password1 = ref('')
const isChecked = ref(true)

const sendCode = computed(()=>store.state.user.code)

////获取验证码
//const getCode = async function (phone){
//  try {
//    //需要有手机号时才能获取验证码
//    phone && await store.dispatch("getPhoneCode",phone)
//    code.value = sendCode.value
//  }catch (error){
//    alert(error.message)
//  }
//}
const ruleFormRef = ref(null)

const loading = ref(false)

const labelPosition = ref('right')

const formSize =ref('default')

const countdown = ref(0)

const ruleForm = reactive({
  phoneNum:'',
  code:'',
  password:'',
  password1:'',
  isChecked:false
})

//确认密码
const checkPassword = (rule,value,callback)=>{
  if (value !== ruleForm.password){
    callback(new Error('两次输入的密码不一致'))
  }else{
    callback()
  }
}
const validateIsChecked = (rule,value,callback)=>{
  if (!value){
    callback(new Error('请先勾选同意协议!!!'))
  }else {
    callback()
  }
}

const rules = reactive({
  phoneNum:[
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  code:[
    { required: true, message: '请输入验证码'},
    { pattern: /^\d{6}$/,message:'验证码必须为六位数字',trigger:'blur'}
//    { len: 6, type: 'number', message: '验证码长度为6个数字', trigger: 'blur' },
  ],
  password:[
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在6到20个字符之间', trigger: 'blur' }
  ],
  password1:[
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: checkPassword, trigger: 'blur' }
  ],
  isChecked:[
    { required: true, message: '请勾选同意协议', trigger: 'change' },
    { type:'enum', enum:[true], message: "请勾选同意协议"}
//    { validator: validateIsChecked, trigger: 'blur' }
  ]
})

//获取验证码
const getCode = async function (phone){
  try {
    //需要有手机号时才能获取验证码
    if (!ruleForm.phoneNum){
      ElMessage.error('请先输入手机号')
      return
    }

    if (countdown.value > 0) return;

      await store.dispatch("getPhoneCode",phone)
      ruleForm.code = sendCode.value
      countdown.value = 10
      let timer = null
      timer = setInterval(()=>{
        if (countdown.value > 0){
          countdown.value --
        }else{
          clearInterval(timer)
          timer = null
        }

      },1000)

  }catch (error){
    ElMessage.error('验证码获取失败')
  }
}

//用户注册
const userRegister = async function (formEl){
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!');
      try {
        await store.dispatch('getRegisterUser',{phone:ruleForm.phoneNum,code:ruleForm.code,password:ruleForm.password})
        router.push('/login')
        ElMessage.success('注册成功')
        loading.value = true
      }catch (error){
        ElMessage.error('注册失败，请重新注册')
        // 清空表单
        formEl.resetFields()
        router.push('/register')
      }

    } else {
      console.log('error submit!', fields);
      ElMessage.error('请先输入必填字段')
    }
  });
}



</script>

<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div class="form-container">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="80px"
            class="demo-ruleForm"
            :size="formSize"
            :label-position="labelPosition"
            status-icon
        >
          <el-form-item label="手机号" prop="phoneNum">
            <el-input v-model="ruleForm.phoneNum" type="text" />
          </el-form-item>

          <el-form-item label="验证码" prop="code">
            <el-input v-model="ruleForm.code">
            <template #append>
              <el-button @click="getCode(ruleForm.phoneNum)" :disabled="countdown > 0">{{countdown > 0 ? countdown + 's 后重新获取' : '获取验证码'}}</el-button>
            </template>
            </el-input>
          </el-form-item>


          <el-form-item label="登录密码" prop="password">
            <el-input
                v-model="ruleForm.password"
                type="password"
                placeholder="请输入密码"
                show-password
            />
          </el-form-item>
          <el-form-item label="确认密码" prop="password1">
            <el-input
                v-model="ruleForm.password1"
                type="password"
                placeholder="请输入确认密码"
                show-password
            />
          </el-form-item>
          <el-form-item prop="isChecked">
            <el-checkbox
                label="同意接受网站的使用条款和隐私政策"
                @change="ruleForm.isChecked = !ruleForm.isChecked"
                :key="Math.random()"
            ></el-checkbox>
          </el-form-item>
          <el-form-item>
              <el-button
                  type="primary"
                  style="width: 100%;margin-top: 10px"
                  @click="userRegister(ruleFormRef)"
                  v-loading="loading"
              >注册</el-button>
          </el-form-item>

        </el-form>

      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register'
  }
</script>

<style lang="less" scoped>
.register {
  width: 1200px;
  height: 440px;
  border: 1px solid rgb(223, 223, 223);
  margin: 0 auto;

  h3 {
    background: #ececec;
    margin: 0;
    padding: 6px 15px;
    color: #333;
    border-bottom: 1px solid #dfdfdf;
    font-size: 20.04px;
    line-height: 30.06px;

    span {
      font-size: 14px;
      float: right;

      a {
        color: #e1251b;
      }
    }
  }
  .form-container{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

}
</style>
