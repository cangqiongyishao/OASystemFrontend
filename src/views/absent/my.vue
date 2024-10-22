<script setup name="myabsent">
import OAPageHeader from "@/components/OAPageHeader.vue";
import absentHttp from "@/api/absentHttp";
import { ref, reactive, onMounted, computed,watch } from "vue";
import { ElMessage } from "element-plus";
import timeFormatter from "@/utils/timeFormatter";
import OAMain from "@/components/OAMain.vue";
import OAPagination from "@/components/OAPagination.vue";
import OADiaglog from "@/components/OADiaglog.vue";

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
let absents = ref([]);
let absent_types = ref([]);
let responder = reactive({
  email: "",
  realname: "",
});

let pagination=reactive({
    total:0,
    page:1
})

let responder_str = computed(() => {
  if (responder.email) {
    return "[" + responder.email + "]" + responder.realname;
  } else {
    return "Null";
  }
});

watch(()=>pagination.page,(value)=>{
    requestAbsents(value)
})

const requestAbsents=async (page)=>{
    try{
        let absents_data = await absentHttp.getMyAbsents(page);
        let total =absents_data.count;
        pagination.total=total
        let results=absents_data.results;
        absents.value = results;
    }catch(detail){
        ElMessage.error(detail);
    }
}

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
        absents.value.unshift(absent)
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

    requestAbsents(1)
  } catch (detail) {
    ElMessage.error(detail);
  }
});
</script>

<template>
  <OAMain title="Personal Absent">
    <el-card style="text-align: right">
      <el-button type="primary" @click="OnShowDialog">
        <el-icon><Plus /></el-icon>New Absent</el-button
      >
    </el-card>

    <el-card>
      <el-table :data="absents" style="width: 100%">
        <el-table-column prop="title" label="Title" />
        <el-table-column prop="absent_type.name" label="Style" />
        <el-table-column prop="request_content" label="Reason" />
        <el-table-column label="Create Time">
          <template #default="scope">
            {{ timeFormatter.stringFromDateTime(scope.row.create_time) }}
          </template>
        </el-table-column>

        <el-table-column label="Start Date">
          <template #default="scope">
            {{ timeFormatter.stringFromDate(scope.row.start_date) }}
          </template>
        </el-table-column>

        <el-table-column label="End Date">
          <template #default="scope">
            {{ timeFormatter.stringFromDate(scope.row.end_date) }}
          </template>
        </el-table-column>

        <el-table-column label="Responder">
          {{ responder_str }}
        </el-table-column>
        <el-table-column prop="response_content" label="Response Content" />
        <el-table-column label="Review Status">
          <template #default="scope">
            <el-tag type="info" v-if="scope.row.status == 1">Auditing</el-tag>
            <el-tag type="success" v-else-if="scope.row.status == 2"
              >Pass</el-tag
            >
            <el-tag type="danger" v-else>Reject</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <!-- <el-pagination
          background
          layout="prev, pager, next"
          :page-size="10"
          :total="pagination.total"
          v-model:current-page="pagination.page"
        /> -->
        <OAPagination v-model="pagination.page" :total="pagination.total"></OAPagination>
      </template>
    </el-card>

  </OAMain>

  <OADiaglog title="New absent" v-model="dialogFormVisible" @submit="OnSubmitAbsent">

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
  </OADiaglog>

</template>

<style  scoped>



</style>
