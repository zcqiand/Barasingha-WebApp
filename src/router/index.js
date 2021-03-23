import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import HomeLayout from '@/layout/home/HomeLayout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '主页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },

  {
    path: '/novel',
    component: Layout,
    redirect: '/novel/novel',
    name: '作品管理',
    meta: { title: '作品管理', icon: 'el-icon-edit-outline' },
    children: [
      {
        path: 'maincategory',
        name: '作品大类',
        component: () => import('@/views/maincategory/MainCategoryList'),
        meta: { title: '作品大类', icon: 'el-icon-folder' }
      },
      {
        path: 'subcategory',
        name: '作品小类',
        component: () => import('@/views/subcategory/SubCategoryList'),
        meta: { title: '作品小类', icon: 'el-icon-folder' }
      },
      {
        path: 'novel',
        name: '作品管理',
        component: () => import('@/views/novel/NovelList'),
        meta: { title: '作品管理', icon: 'el-icon-reading' }
      },
      {
        path: '/novel/:novelId/segment',
        name: '作品分卷',
        component: () => import('@/views/segment/SegmentList'),
        meta: { title: '作品分卷', icon: 'el-icon-reading' },
        hidden: true
      },
      {
        path: '/novel/:novelId/chapter',
        name: '作品章节',
        component: () => import('@/views/chapter/ChapterList'),
        meta: { title: '作品章节', icon: 'el-icon-reading' },
        hidden: true
      }
    ]
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/system/app',
    name: '系统管理',
    meta: { title: '系统管理', icon: 'el-icon-s-tools' },
    children: [
      {
        path: 'menu',
        name: '菜单管理',
        component: () => import('@/views/menu/MenuList'),
        meta: { title: '菜单管理', icon: 'el-icon-menu' }
      },
      {
        path: 'role',
        name: '角色管理',
        component: () => import('@/views/role/RoleList'),
        meta: { title: '角色管理', icon: 'el-icon-s-check' }
      },
      {
        path: 'user',
        name: '用户管理',
        component: () => import('@/views/user/UserList'),
        meta: { title: '用户管理', icon: 'el-icon-s-custom' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
