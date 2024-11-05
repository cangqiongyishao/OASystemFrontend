<script setup name="publishinform">
import OAMain from "@/components/OAMain.vue";
import { ref, reactive, onMounted, computed, watch } from "vue";

let informForm = reactive({
    title: "",
    content: "",
    department_ids: [],
});

const rules = reactive({
    title: [{ required: true, message: "Please type in title", trigger: "blur" }],
    content: [
        { required: true, message: "Please type in content", trigger: "blur" },
    ],
    department_ids: [
        { required: true, message: "Please choose department", trigger: "change" },
    ],
});

let formRef = ref();
let formLabelWidth = "100px";
</script>

<template>
    <OAMain title="Publish Notification">
        <el-form :model="informForm" :rules="rules" ref="formRef">
            <el-form-item label="Title" :label-width="formLabelWidth" prop="title">
                <el-input v-model="informForm.title" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Visible to the department" :label-width="formLabelWidth" prop="department_ids">
                <el-select v-model="informForm.department_ids">
                    <el-option v-for="item in absent_types" :label="item.name" :value="item.id" :key="item.name" />
                </el-select>
            </el-form-item>
            <el-form-item label="Absent Time" :label-width="formLabelWidth" prop="date_range">
                <el-date-picker v-model="absent_form.date_range" type="daterange" range-separator="To"
                    start-placeholder="Start date" end-placeholder="End date" />
            </el-form-item>

            <el-form-item label="Responder" :label-width="formLabelWidth">
                <el-input :value="responder_str" readonly disabled autocomplete="off" />
            </el-form-item>

            <el-form-item label="Reason for absent" :label-width="formLabelWidth" prop="request_content">
                <el-input type="textarea" v-model="absent_form.request_content" autocomplete="off" />
            </el-form-item>
        </el-form>
    </OAMain>
</template>

<style scoped></style>
