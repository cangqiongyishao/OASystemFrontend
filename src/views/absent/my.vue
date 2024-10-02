<script setup name="myabsent">
import OAPageHeader from "@/components/OAPageHeader.vue";
import absentHttp from "@/api/absentHttp";
import { ref, reactive, onMounted, computed } from "vue";
import { ElMessage } from "element-plus";

let formLabelWidth = "100px";
let dialogFormVisible = ref(false);

let absent_form = reactive({
  title: "",
  absent_type_id: null,
  date_range: [],
  request_content: "",
});

let absent_form_ref = ref();
let rules = reactive({
  title: [
    { required: true, message: "Please enter the title", trigger: "blur" },
  ],
  absent_type_id: [
    { required: true, message: "Please choice absent type", trigger: "change" },
  ],
  date_range: [
    { required: true, message: "Please choice absent time", trigger: "blur" },
  ],
  request_content: [
    { required: true, message: "Please type absent reason", trigger: "blur" },
  ],
});
let absent_types = ref([]);
let responder = reactive({
  email: "",
  realname: "",
});

let responder_str = computed(() => {
  if (responder.email) {
    return "[" + responder.email + "]" + responder.realname;
  } else {
    return "Null";
  }
});

const OnShowDialog = () => {
  absent_form.title = "";
  absent_form.absent_type_id = null;
  absent_form.date_range = [];
  absent_form.request_content = "";
  dialogFormVisible.value = true;
};

const OnSubmitAbsent = () => {
  absent_form_ref.value.validate(async (valid, fields) => {
    if (valid) {
      let data = {
        title: absent_form.title,
        absent_type_id: absent_form.absent_type_id,
        start_date: absent_form.date_range[0],
        end_date: absent_form.date_range[1],
        request_content: absent_form.request_content,
      };
      try {
        let absent = await absentHttp.applyAbsent(data);
        dialogFormVisible.value = false;
        console.log(absent);
      } catch (detail) {
        ElMessage.error(detail);
      }
    }
  });
};

onMounted(async () => {
  try {
    let absent_types_data = await absentHttp.getAbsentTypes();
    absent_types.value = absent_types_data;

    let responder_data = await absentHttp.getResponder();
    Object.assign(responder, responder_data);
  } catch (detail) {
    ElMessage.error(detail);
  }
});
</script>

<template>
  <el-space direction="vertical" fill :size="20" style="width: 100%">
    <OAPageHeader content="Personal Absents"></OAPageHeader>
    <el-card style="text-align: right">
      <el-button type="primary" @click="OnShowDialog">
        <el-icon><Plus /></el-icon>New Absent</el-button
      >
    </el-card>
  </el-space>

  <el-dialog v-model="dialogFormVisible" title="new absent" width="500">
    <el-form :model="absent_form" :rules="rules" ref="absent_form_ref">
      <el-form-item label="Title" :label-width="formLabelWidth" prop="title">
        <el-input v-model="absent_form.title" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="Absent Type"
        :label-width="formLabelWidth"
        prop="absent_type_id"
      >
        <el-select
          v-model="absent_form.absent_type_id"
          placeholder="Please select an absent type"
        >
          <el-option
            v-for="item in absent_types"
            :label="item.name"
            :value="item.id"
            :key="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="Absent Time"
        :label-width="formLabelWidth"
        prop="date_range"
      >
        <el-date-picker
          v-model="absent_form.date_range"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
        />
      </el-form-item>

      <el-form-item label="Responder" :label-width="formLabelWidth">
        <el-input :value="responder_str" readonly disabled autocomplete="off" />
      </el-form-item>

      <el-form-item
        label="Reason for absent"
        :label-width="formLabelWidth"
        prop="request_content"
      >
        <el-input
          type="textarea"
          v-model="absent_form.request_content"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="OnSubmitAbsent"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
