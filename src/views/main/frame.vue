<script setup name="frame">
import { ref, computed,reactive } from "vue";
import {
  Fold,
  Check,
  Delete,
  Edit,
  Expand,
  Message,
  Search,
  Star,
} from "@element-plus/icons-vue";

import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import authHttp from "@/api/authHttp";
import { ElMessage } from "element-plus";

const authstore = useAuthStore();
const router = useRouter();

let isCollapse = ref(false);
let dialogVisible=ref(false);
let formLabelWidth ="140px"
let resetPwdForm=reactive({
  oldpwd:'',
  pwd1:'',
  pwd2:''
})

let formTag=ref()

let rules=reactive({
  oldpwd: [
    { required: true, message: 'Please input old password', trigger: 'blur' },
    { min: 6, max: 20, message: 'Length should be 6 to 20', trigger: 'blur' },
  ],
  pwd1:[
    { required: true, message: 'Please input new password', trigger: 'blur' },
    { min: 6, max: 20, message: 'Length should be 6 to 20', trigger: 'blur' },
  ],
  pwd2:[
    { required: true, message: 'Please confirm new password', trigger: 'blur' },
    { min: 6, max: 20, message: 'Length should be 6 to 20', trigger: 'blur' },
  ]
})

let asideWidth = computed(() => {
  if (isCollapse.value) {
    return "64px";
  } else {
    return "250px";
  }
});

const OnCollapsAside = () => {
  isCollapse.value = !isCollapse.value;
};
const OnExit = () => {
  authstore.clearUserToken();
  router.push({ name: "login" });
};

const onControlResetpwdDialog =()=>{
  resetPwdForm.oldpwd=""
  resetPwdForm.pwd1=""
  resetPwdForm.pwd2=""
  dialogVisible.value=true
}

const onSubmit=()=>{
  formTag.value.validate(async (valid,fields) =>{
    if(valid){
      try{
        await authHttp.resetPwd(resetPwdForm.oldpwd,resetPwdForm.pwd1,resetPwdForm.pwd2)
        ElMessage.success('Password change correct')
        dialogVisible.value=false
      }catch(detail){
        ElMessage.error(detail)
      }
    }else{
      ElMessage.info('Please enter the correct fields')
    }
    console.log(fields)
  })
  console.log('click submit')
}
</script>

<template>
  <el-container class="container">
    <el-aside class="aside" width="asideWidth">
      <router-link to="/" class="brand"
        ><strong>Xiao</strong
        ><span v-show="!isCollapse">OASystem</span></router-link
      >
      <el-menu
       :router="true" 
        active-text-color="#ffd04b"
        background-color="#343a40"
        class="el-menu-vertical-demo"
        default-active="1"
        text-color="#fff"
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <el-menu-item index="1">
          <el-icon><HomeFilled /></el-icon>
          <span>FrontPage</span>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><Checked /></el-icon>
            <span>Absent Management</span>
          </template>
          <el-menu-item index="2-1" :route="{name:'myabsent'}">
            <el-icon><UserFilled /></el-icon>
            <span>Personal Absent</span>
          </el-menu-item>
          <el-menu-item index="2-2" :route="{name:'subabsent'}">
            <el-icon><User /></el-icon>
            <span>Subordinate Absent</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="3">
          <template #title>
            <el-icon><BellFilled /></el-icon>
            <span>Notification Management</span>
          </template>
          <el-menu-item index="3-1">
            <el-icon><CirclePlusFilled /></el-icon>
            <span>Publish Notification</span>
          </el-menu-item>
          <el-menu-item index="3-2">
            <el-icon><List /></el-icon>
            <span>Notification List</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="4">
          <template #title>
            <el-icon><Avatar /></el-icon>
            <span>Employee Management</span>
          </template>
          <el-menu-item index="4-1">
            <el-icon><CirclePlusFilled /></el-icon>
            <span>New Employee</span>
          </el-menu-item>
          <el-menu-item index="4-2">
            <el-icon><List /></el-icon>
            <span>Employee List</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div class="left-header">
          <el-button
            v-show="isCollapse"
            :icon="Expand"
            @click="OnCollapsAside"
          />
          <el-button
            v-show="!isCollapse"
            :icon="Fold"
            @click="OnCollapsAside"
          />
        </div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar :size="30" icon="UserFilled" />
            <span style="margin-left: 10px">
              {{ authstore.user.realname }}</span
            >
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="onControlResetpwdDialog">Change Password</el-dropdown-item>
              <el-dropdown-item divided @click="OnExit"
                >Logout</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main class="main"><RouterView></RouterView></el-main>
    </el-container>
  </el-container>
  <el-dialog v-model="dialogVisible" title="change password" width="500">
    <el-form :model="resetPwdForm" :rules="rules" ref="formTag">
      <el-form-item label="old password" :label-width="formLabelWidth" prop="oldpwd">
        <el-input v-model="resetPwdForm.oldpwd" autocomplete="off" type="password" />
      </el-form-item>

      <el-form-item label="new password" :label-width="formLabelWidth" prop="pwd1">
        <el-input v-model="resetPwdForm.pwd1" autocomplete="off" type="password" />
      </el-form-item>

      <el-form-item label="confirm password" :label-width="formLabelWidth" prop="pwd2">
        <el-input v-model="resetPwdForm.pwd2" autocomplete="off" type="password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="onSubmit">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.aside {
  background-color: #343a40;
  shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22) !important;
}

.container {
  height: 100vh;
  background-color: #f4f6f9;
}

.aside .brand {
  color: #fff;
  text-decoration: none;
  border-bottom: 1px solid #434a50;
  background-color: #232631;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}

.header {
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
}

.el-menu {
  border-right: None;
}
</style>
