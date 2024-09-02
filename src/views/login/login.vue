<script setup name="login">
import login_img from "@/assets/image/login.png";
import { reactive } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";


const authStore = useAuthStore()
const router = useRouter()

let form=reactive({
    email:'',
    password:''
})

const OnSubmit =()=>{
    let pwdRgx = /^[0-9a-zA-Z_-]{6,20}/
    let emailRgx = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9])+/
    if (!(emailRgx.test(form.email))){
        alert('email form incorrect')
        return;
    }
    if (!(pwdRgx.test(form.password))){
        alert('password form incorrect')
        return;
    }

    axios.post("http://127.0.0.1:8000/auth/login", {
        email:form.email,
        password:form.password
    }).then((res)=>{
        let data=res.data;
        let token = data.token;
        let user=data.user;
        authStore.setUserToken(user,token)
        router.push({name:"frame"})

    }).catch((err)=>{
        console.log(err);
    })

}
</script>

<template>
  <div class="dowebok">
    <div class="container-login100">
      <div class="wrap-login100">
        <div class="login100-pic js-tilt" data-tilt>
          <img :src="login_img" alt="IMG" />
        </div>

        <div class="login100-form validate-form">
          <span class="login100-form-title"> 员工登陆 </span>

          <div class="wrap-input100 validate-input">
            <input
              class="input100"
              type="text"
              name="email"
              placeholder="email"
              v-model="form.email"
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="iconfont icon-fa-envelope" aria-hidden="true"></i>
            </span>
          </div>

          <div class="wrap-input100 validate-input">
            <input
              class="input100"
              type="password"
              name="password"
              placeholder="password"
              v-model="form.password"
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="iconfont icon-fa-lock" aria-hidden="true"></i>
            </span>
          </div>

          <div class="container-login100-form-btn">
            <button class="login100-form-btn" @click="OnSubmit">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="@/assets/css/login.css"></style>
<style scoped src="@/assets/iconfont/iconfont.css"></style>