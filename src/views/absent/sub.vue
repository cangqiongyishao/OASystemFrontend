<script setup name="subabsent">
import OAPageHeader from "@/components/OAPageHeader.vue";
import absentHttp from "@/api/absentHttp";
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import timeFormatter from "@/utils/timeFormatter";
import OAMain from "@/components/OAMain.vue";
import OAPagination from "@/components/OAPagination.vue";
import OADiaglog from "@/components/OADiaglog.vue";

let absents = ref([]);
let pagination = reactive({
  total: 0,
  page: 1,
});

let dialogVisible = ref(false);

let absentForm = reactive({
  status: 2,
  reaponse_content: "",
});

let rules = reactive({
  status: [
    {
      required: true,
      message: "Please select process result",
      triger: "change",
    },
  ],
  response_content: [
    { required: true, message: "please type reason", triger: "blur" },
  ],
});

let absent_form_ref = ref({});

onMounted(async () => {
  try {
    let data = await absentHttp.getSubAbsents();
    pagination.total = data.count;
    absents.value = data.results;
  } catch (detail) {
    ElMessage.error(detail);
  }
});

const onShowDialog = () => {
  dialogVisible.value = true;
};
</script>

<template>
  <OADiaglog
    title="Manage Attendance"
    v-model="dialogVisible"
    @click="onsubmitAbsent"
  >
    <el-form
      :model="absentForm"
      :rules="rules"
      ref="absent_form_ref"
      label-width="100px"
    >
      <el-form-item label="Result" prop="status">
        <el-radio-group v-model="absentForm.status">
          <el-radio :value="2">Pass</el-radio>
          <el-radio :value="3">Reject</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Reason" prop="response_content">
        <el-input
          type="textarea"
          v-model="absentForm.request_content"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
  </OADiaglog>
  <OAMain title="Sub Absents">
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

        <el-table-column prop="responder.realname" label="Responder" />
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
        <el-table-column label="Processing status">
          <template #default="scope">
            <el-button
              v-if="scope.row.status == 1"
              @click="onShowDialog"
              type="primary"
              icon="EditPen"
            />
            <el-button v-else disabled type="default">processed</el-button>
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
        <OAPagination
          v-model="pagination.page"
          :total="pagination.total"
        ></OAPagination>
      </template>
    </el-card>
  </OAMain>
</template>

<style scoped>
.el-pagination {
  justify-content: center;
}
</style>
