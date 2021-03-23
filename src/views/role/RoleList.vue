<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form label-width="100px" size="small">
            <el-form-item label="角色名称:">
              <el-input v-model="queryCondition.Name" />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="16">
          <el-form label-width="100px" size="small">
            <el-button type="primary" style="float: right; margin-left: 15px" size="small" @click="search()">查询</el-button>
            <el-button size="small" style="float: right" @click="resetSearch()">重置</el-button>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="table-container" shadow="never">
      <span>角色管理</span>
      <el-button type="primary" style="float: right" size="small" @click="add()">新增</el-button>
      <el-table v-loading="loading" :data="items" element-loading-text="加载中" style="width: 100%" row-key="Id" stripe>
        <el-table-column prop="No" label="序号" sortable width="90" />
        <el-table-column prop="Name" label="角色名称" sortable />
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="edit(scope.row.Id)">编辑</el-button>
            <el-button type="primary" size="small" @click="editPermission(scope.row.Id)">配置权限</el-button>
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
      <RoleDialog :dialog-visible="dialogVisible" :dialog-type="dialogType" :selected-item="selectedItem" @save="save" @cancel="cancel" />
      <RolePermission ref="rolePermission" :dialog-visible="dialogType === 'editPermission'" :dialog-type="dialogType" :selected-item="selectedItem" :menus="menus" @save="save" @cancel="cancel" />
    </div>
  </div>
</template>

<script>
import { query, get, create, update, setPermission,del } from '@/api/role'
import { getselect } from '@/api/menu'
import RoleDialog from './RoleDialog.vue'
import RolePermission from './RolePermission.vue'

const defaultQueryCondition = {
  Name: ''
}

export default {
  components: {
    RoleDialog,
    RolePermission
  },
  data() {
    return {
      queryCondition: Object.assign({}, defaultQueryCondition),
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
    this.query()
    this.getselect()
  },
  methods: {
    getselect() {
      getselect().then((response) => {
        this.menus = response.data
      })
    },
    resetSearch() {
      this.queryCondition = Object.assign({}, defaultQueryCondition)
    },
    search() {
      this.query()
    },
    query() {
      this.loading = true
      query(this.queryCondition.Name, this.paginations.pageIndex, this.paginations.pageSize).then((response) => {
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
    async editPermission(id) {
      await get(id).then((response) => {
        this.selectedItem = response.data
      })
      console.log(this.selectedItem)
      //this.$refs.rolePermission.$emit('childMethod','发送给方法一的数据')
      // this.$refs.rolePermission.$emit('setCheckedKeys',this.selectedItem.MenuIds)
      // this.$refs.rolePermission.setCheckedKeys(this.selectedItem.MenuIds)
      this.dialogType = 'editPermission'
    },
    async save(item) {
      console.log(item)
      this.loading = true
      if (this.dialogType === 'edit') {
        await this.update(item)
      } else if (this.dialogType === 'editPermission') {
        await this.setPermission(item)
      } else {
        await this.create(item)
      }
      this.selectedItem = {}
      this.dialogVisible = false
      this.dialogType = 'add'
      this.query()
    },
    async create(item) {
      await create(item)
    },
    async update(item) {
      await update(item.Id, item)
    },
    async setPermission(item) {
      await setPermission(item.Id, item)
    },
    async del(id) {
      this.loading = true
      await del(id)
      this.query()
    },
    cancel() {
      this.dialogVisible = false
      this.dialogType = 'add'
      this.selectedItem = {}
    }
  }
}
</script>
<style scoped>
</style>

