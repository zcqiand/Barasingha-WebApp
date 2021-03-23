<template>
  <div class="app-container">
    <el-card class="table-container" shadow="never">
      <span>作品分卷</span>
      <el-button type="primary" @click="add()">新增</el-button>
      <el-table v-loading="loading" :data="items" element-loading-text="加载中" style="width: 100%" row-key="Id" border>
        <el-table-column prop="No" label="序号" sortable width="90" />
        <el-table-column prop="Name" label="分卷名称" sortable />
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
      <SegmentDialog :dialog-visible="dialogVisible" :dialog-type="dialogType" :selected-item="selectedItem" @save="save" @cancel="cancel" />
    </div>
  </div>
</template>

<script>
import { query, get, create, update, del } from '@/api/segment'
import SegmentDialog from './SegmentDialog.vue'

export default {
  components: {
    SegmentDialog
  },
  data() {
    return {
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
    query() {
      this.loading = true
      query(this.novelId, this.paginations.pageIndex, this.paginations.pageSize).then((response) => {
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
      item.NovelId = this.novelId
      this.loading = true
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
<style scoped>
</style>

