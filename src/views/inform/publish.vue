<script setup name="publishinform">
import '@wangeditor/editor/dist/css/style.css';
import OAMain from "@/components/OAMain.vue";
import { ref, reactive, onMounted, onBeforeUnmount, shallowRef } from "vue";
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

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
let departments = ref([])

//wang setup
const editorRef = shallowRef()

const toolbarConfig = {}
const editorConfig = { placeholder: 'Type here...' }
let mode="default"

// Timely destroy `editor` before vue component destroy.
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
    editorRef.value = editor // record editor instance
}

const onSubmit=()=>{
    formRef.value.validate((valid,fields) =>{
        if(valid){
            console.log(informForm);
        }
    })
}
</script>

<template>
    <OAMain title="Publish Notification">
        <el-form :model="informForm" :rules="rules" ref="formRef">
            <el-form-item label="Title" :label-width="formLabelWidth" prop="title">
                <el-input v-model="informForm.title" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Visible" :label-width="formLabelWidth" prop="department_ids">
                <el-select multiple v-model="informForm.department_ids">
                    <el-option :value="0" label="All departments"></el-option>
                    <el-option v-for="department in departments" :label="department.name" :value="department.id"
                        :key="department.name" />
                </el-select>
            </el-form-item>
            <el-form-item label="Content" :label-width="formLabelWidth" prop="content">
                <div style="border: 1px solid #ccc; width: 100%">
                    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                        :mode="mode" />
                    <Editor style="height: 500px; overflow-y: hidden;" v-model="informForm.content" :defaultConfig="editorConfig"
                        :mode="mode" @onCreated="handleCreated" />
                </div>
            </el-form-item>
            <el-form-item >
                <div style="text-align: right; flex: 1;">
                 <el-button type="primary" @click="onSubmit">Submit</el-button>   
                </div>
                
            </el-form-item>
        </el-form>
    </OAMain>
</template>

<style scoped></style>
