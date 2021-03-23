<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <el-form :inline="true" :model="queryCondition" size="small" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="用户昵称:">
              <el-input v-model="queryCondition.NickName" />
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-button type="primary" style="float: right; margin-left: 15px" size="small" @click="search()">查询</el-button>
            <el-button size="small" style="float: right" @click="resetSearch()">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="table-container" shadow="never">
      <span>用户管理</span>
      <el-button type="primary" style="float: right" size="small" @click="add()">新增</el-button>
      <el-table v-loading="loading" :data="items" element-loading-text="加载中" style="width: 100%" row-key="Id" stripe>
        <el-table-column prop="No" label="序号" sortable width="90" />
        <el-table-column prop="UserName" label="用户名称" sortable />
        <el-table-column prop="NickName" label="用户昵称" sortable />
        <el-table-column prop="GenderName" label="性别" sortable />
        <el-table-column prop="Disabled" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.Disabled" :active-value="false" :inactive-value="true"></el-switch>
          </template>
        </el-table-column>
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
      <UserDialog :dialog-visible="dialogVisible" :dialog-type="dialogType" :selected-item="selectedItem" :genders="genders" :roles="roles" @save="save" @cancel="cancel" />
    </div>
  </div>
</template>

<script>
import { query, get, create, update, del } from '@/api/user'
import { queryAll as roleQueryAll } from '@/api/role'
import { query as enumQuery } from '@/api/enum'
import UserDialog from './UserDialog.vue'

const defaultQueryCondition = {
  NickName: ''
}

const defaultSelectedItem = {
  RoleIds: []
}

export default {
  components: {
    UserDialog
  },
  data() {
    return {
      queryCondition: Object.assign({}, defaultQueryCondition),
      items: [],
      genders: [],
      roles: [],
      loading: true,
      selectedItem: Object.assign({}, defaultSelectedItem),
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
    this.genderQuery()
    this.roleQueryAll()
    this.query()
  },
  methods: {
    resetSearch() {
      this.queryCondition = Object.assign({}, defaultQueryCondition)
    },
    search() {
      this.query()
    },
    query() {
      this.loading = true
      query(this.queryCondition.NickName, this.paginations.pageIndex, this.paginations.pageSize).then((response) => {
        this.items = response.data.Items
        this.paginations.total = response.data.Total
        this.loading = false
      })
    },
    roleQueryAll() {
      roleQueryAll().then((response) => {
        this.roles = response.data
      })
    },
    genderQuery() {
      enumQuery('性别').then((response) => {
        this.genders = response.data
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
      this.selectedItem = Object.assign({}, defaultSelectedItem)
      this.dialogType = 'add'
      this.dialogVisible = true
    },
    async edit(id) {
      await get(id).then((response) => {
        this.selectedItem = response.data
        console.log(this.selectedItem)
      })

      this.dialogType = 'edit'
      this.dialogVisible = true
    },
    async save(item) {
      console.log(item)
      this.loading = true
      const isEdit = this.dialogType === 'edit'
      if (isEdit) {
        await this.update(item)
      } else {
        await this.create(item)
      }
      this.selectedItem = Object.assign({}, defaultSelectedItem)
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

