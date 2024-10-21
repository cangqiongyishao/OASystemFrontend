<script setup name="subabsent">
import OAPageHeader from "@/components/OAPageHeader.vue";
import absentHttp from "@/api/absentHttp";
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import timeFormatter from "@/utils/timeFormatter";
import OAMain from "@/components/OAMain.vue";
import OAPagination from "@/components/OAPagination.vue";

let absents = ref([]);
let pagination = reactive({
  total: 0,
  page: 1,
});
</script>

<template>
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
              type="primary"
              icon="EditPen"
            />
            <el-button v-esle disabled type="default">processed</el-button>
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

</template>

<style scoped>
.el-pagination{
    justify-content: center;
}

</style>
