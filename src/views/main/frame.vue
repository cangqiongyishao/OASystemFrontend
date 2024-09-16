<script setup name="frame">
import { ref, computed } from "vue";
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

const authstore=useAuthStore()
const router=useRouter()

let isCollapse = ref(false);

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
const OnExit=()=>{
  authstore.clearUserToken()
  router.push({name:'login'})
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
            <span>Attendance Management</span>
          </template>
          <el-menu-item index="2-1">
            <el-icon><UserFilled /></el-icon>
            <span>Personal Attendance</span>
          </el-menu-item>
          <el-menu-item index="2-2">
            <el-icon><User /></el-icon>
            <span>Subordinate Attendance</span>
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
            <span style="margin-left: 10px;"> {{ authstore.user.realname }}</span>
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Change Password</el-dropdown-item>
              <el-dropdown-item divided @click="OnExit">Logout</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
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
