<script setup name="frame"></script>

<template>
  <el-container class="container">
    <el-aside class="aside" width="250px">
      <Router-link to="/" class="brand">XiaoOASystem</Router-link>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#343a40"
        class="el-menu-vertical-demo"
        default-active="1"
        text-color="#fff"
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
      <el-header class="header">Header</el-header>
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
}

.el-menu {
  border-right: None;
}
</style>
