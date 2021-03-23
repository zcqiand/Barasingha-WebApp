<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form label-width="100px" size="small">
            <el-form-item label="更新时间：">
              <el-date-picker v-model="queryCondition.UpdateTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form label-width="100px" size="small">
            <el-form-item label="章节名称：">
              <el-input v-model="queryCondition.Name" />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form label-width="100px" size="small">
            <el-button type="primary" style="float: right; margin-left: 15px" size="small" @click="search()">查询</el-button>
            <el-button size="small" style="float: right" @click="resetSearch()">重置</el-button>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="table-container" shadow="never">
      <span>作品章节</span>
      <el-button type="primary" style="float: right" size="small" @click="add()">新增</el-button>
      <el-table v-loading="loading" :data="items" element-loading-text="加载中" style="width: 100%" row-key="Id" stripe>
        <el-table-column prop="No" label="序号" sortable width="90" />
        <el-table-column prop="Name" label="章节名称" sortable />
        <el-table-column prop="SegmentName" label="分卷名称" sortable width="120" />
        <el-table-column prop="UpdateTime" label="更新时间" :formatter="dateFormat" sortable width="120" />
        <el-table-column prop="ReleaseTime" label="发布时间" :formatter="dateFormat" sortable width="120" />
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="edit(scope.row.Id)">编辑</el-button>
            <el-button type="danger" size="small" @click="del(scope.row.Id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div class="pagination-container">
      <el-pagination
        v-if="paginations.total > 0"
        :page-sizes="paginations.pageSizes"
        :page-size="paginations.pageSize"
        :layout="paginations.layout"
        :total="paginations.total"
        :current-page="paginations.pageIndex"
        @current-change="currentChange"
        @size-change="sizeChange"
      />
    </div>
    <div class="form-container">
      <ChapterDialog :dialog-visible="dialogVisible" :dialog-type="dialogType" :selected-item="selectedItem" @save="save" @cancel="cancel" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/zh-cn'
import { query, get, create, update, del } from '@/api/chapter'
import ChapterDialog from './ChapterDialog.vue'

const defaultQueryCondition = {
  UpdateTime: [moment(new Date()).subtract(30, 'days').format('l'), moment(new Date()).format('l')],
  Name: ''
}

export default {
  components: {
    ChapterDialog
  },
  data() {
    return {
      queryCondition: Object.assign({}, defaultQueryCondition),
      novelId: null,
      items: [],
      loading: true,
      selectedItem: {},
      dialogType: 'add',
      dialogVisible: false,
      paginations: {
        total: 0,
        pageIndex: 1,
        pageSize: 20,
        pageSizes: [5, 10, 15, 20],
        layout: 'total, sizes, prev, pager, next, jumper'
      }
    }
  },
  created() {
    this.novelId = this.$route.params.novelId
    this.query()
  },
  methods: {
    dateFormat: function (row, column) {
      var date = row[column.property]
      if (!date) {
        return 'N/A'
      }
      return moment(date).calendar()
    },
    resetSearch() {
      this.queryCondition = Object.assign({}, defaultQueryCondition)
    },
    search() {
      this.query()
    },
    query() {
      this.loading = true
      query(
        moment(this.queryCondition.UpdateTime[0]).format('l'),
        moment(this.queryCondition.UpdateTime[1]).format('l'),
        this.queryCondition.Name,
        this.paginations.pageIndex,
        this.paginations.pageSize
      ).then((response) => {
        this.items = response.data.Items
        this.paginations.total = response.data.Total
        this.loading = false
      })
    },
    // 每页多少条切换
    sizeChange(pageSize) {
      this.paginations.pageSize = pageSize
      this.query()
    },
    // 上下分页
    currentChange(page) {
      this.paginations.pageIndex = page
      this.query()
    },
    async add() {
      this.selectedItem = {}
      this.dialogType = 'add'
      this.dialogVisible = true
    },
    async edit(id) {
      await get(id).then((response) => {
        this.selectedItem = response.data
      })

      this.dialogType = 'edit'
      this.dialogVisible = true
    },
    async save(item) {
      this.loading = true
      item.SegmentId = this.segmentId
      const isEdit = this.dialogType === 'edit'
      if (isEdit) {
        await this.update(item)
      } else {
        await this.create(item)
      }
      this.selectedItem = {}
      this.dialogVisible = false
      this.query()
    },
    async create(item) {
      await create(item)
    },
    async update(item) {
      await update(item.Id, item)
    },
    async del(id) {
      this.loading = true
      await del(id)
      this.query()
    },
    cancel() {
      this.dialogVisible = false
    }
  }
}
</script>
<style>
</style>

