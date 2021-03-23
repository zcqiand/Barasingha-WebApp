<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form label-width="100px" size="small">
            <el-form-item label="作品大类:">
              <el-select v-model="queryCondition.mainCategory" placeholder="请选择" clearable style="width: 100%" @change="changeMainCategory">
                <el-option v-for="item in mainCategories" :key="item.value" :label="item.label" :value="item" />
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form label-width="100px" size="small">
            <el-form-item label="作品小类:">
              <el-select v-model="queryCondition.SubCategoryIds" placeholder="请选择" multiple collapse-tags clearable style="width: 100%">
                <el-option v-for="item in queryCondition.mainCategory.children" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form label-width="100px" size="small">
            <el-form-item label="作品状态:">
              <el-select v-model="queryCondition.NovelStatusValue" placeholder="请选择" clearable style="width: 100%">
                <el-option v-for="item in novelStatuses" :key="item.Value" :label="item.Name" :value="item.Value" />
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form label-width="100px" size="small">
            <el-form-item label="连载状态:">
              <el-select v-model="queryCondition.SerialStatusValue" placeholder="请选择" clearable style="width: 100%">
                <el-option v-for="item in serialStatuses" :key="item.Value" :label="item.Name" :value="item.Value" />
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form label-width="100px" size="small">
            <el-form-item label="作品名称:">
              <el-input v-model="queryCondition.Name" style="width: 100%" />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form label-width="100px" size="small">
            <el-form-item>
              <el-button type="primary" style="float: right; margin-left: 15px" size="small" @click="search()">查询</el-button>
              <el-button size="small" style="float: right" @click="resetSearch()">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="table-container" shadow="never">
      <span>作品管理</span>
      <el-button type="primary" style="float: right" size="small" @click="add()">新增</el-button>
      <el-table v-loading="loading" :data="items" element-loading-text="加载中" style="width: 100%" row-key="Id" stripe>
        <el-table-column prop="No" label="序号" sortable width="90" />
        <el-table-column prop="SubCategoryName" label="作品小类" sortable />
        <el-table-column prop="Name" label="作品名称" sortable />
        <el-table-column prop="AuthorName" label="作者" sortable />
        <el-table-column prop="NovelStatusName" label="作品状态" sortable />
        <el-table-column prop="SerialStatusName" label="连载状态" sortable />
        <el-table-column label="操作" align="center" width="330">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="edit(scope.row.Id)">编辑</el-button>
            <el-button type="primary" size="small" @click="segmentManage(scope.row.Id)">分卷管理</el-button>
            <el-button type="primary" size="small" @click="chapterManage(scope.row.Id)">章节管理</el-button>
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
      <NovelDialog :dialog-visible="dialogVisible" :dialog-type="dialogType" :selected-item="selectedItem" :sub-categories="subCategories" :authors="authors" @save="save" @cancel="cancel" />
    </div>
  </div>
</template>

<script>
import { query, get, create, update, del } from '@/api/novel'
import { querySelect as mainCategoryQuerySelect } from '@/api/mainCategory'
import { queryAll as subCategoryQueryAll } from '@/api/subCategory'
import { queryAll as userQueryAll } from '@/api/user'
import { query as enumQuery } from '@/api/enum'
import NovelDialog from './NovelDialog.vue'

const defaultQueryCondition = {
  mainCategory: {},
  MainCategoryId: '',
  SubCategoryIds: [],
  NovelStatusValue: '',
  SerialStatusValue: '',
  Name: ''
}

export default {
  components: {
    NovelDialog
  },
  data() {
    return {
      queryCondition: Object.assign({}, defaultQueryCondition),
      items: [],
      loading: true,
      selectedItem: {},
      subCategories: [],
      mainCategories: [],
      serialStatuses: [],
      novelStatuses: [],
      authors: [],
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
    this.novelStatusQuery()
    this.serialStatusQuery()
    this.mainCategoryQuerySelect()
    this.subCategoryQueryAll()
    this.userQueryAll()
    this.query()
  },
  methods: {
    changeMainCategory(item) {
      this.queryCondition.MainCategoryId = this.queryCondition.mainCategory.value
      this.queryCondition.SubCategoryIds = []
    },
    resetSearch() {
      this.queryCondition = Object.assign({}, defaultQueryCondition)
    },
    search() {
      this.query()
    },
    query() {
      const param = {
        MainCategoryId: this.queryCondition.MainCategoryId,
        SubCategoryIds: this.queryCondition.SubCategoryIds,
        NovelStatusValue: this.queryCondition.NovelStatusValue,
        SerialStatusValue: this.queryCondition.SerialStatusValue,
        Name: this.queryCondition.Name,
        PageIndex: this.paginations.pageIndex,
        PageSize: this.paginations.pageSize
      }
      this.loading = true
      query(param).then((response) => {
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
    novelStatusQuery() {
      enumQuery('作品状态').then((response) => {
        this.novelStatuses = response.data
      })
    },
    serialStatusQuery() {
      enumQuery('连载状态').then((response) => {
        this.serialStatuses = response.data
      })
    },
    mainCategoryQuerySelect() {
      mainCategoryQuerySelect().then((response) => {
        this.mainCategories = response.data
      })
    },
    subCategoryQueryAll() {
      subCategoryQueryAll().then((response) => {
        this.subCategories = response.data
      })
    },
    userQueryAll() {
      userQueryAll().then((response) => {
        this.authors = response.data
      })
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
    async segmentManage(id) {
      this.$router.push(`/novel/${id}/segment`)
    },
    async chapterManage(id) {
      this.$router.push(`/novel/${id}/chapter`)
    },
    async save(item) {
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

