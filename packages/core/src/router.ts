import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import type { Component } from 'vue'
import config from '../config'

interface RouteMenu {
  title?: string
  icon?: Component
  key?: string | number
  isNavigator?: boolean
  children?: IRouter[]
}

export type IRouter = Omit<RouteRecordRaw, 'children'> & RouteMenu

const routes: IRouter[] = [
  {
    name: 'home',
    path: '/home',
    isNavigator: true,
    meta: { title: '首页' },
    component: () => import('./pages/home/index.vue'),
    redirect: '/home/sales',
    children: [
      {
        name: 'sales',
        meta: { title: '销售数据' },
        isNavigator: true,
        path: 'sales',
        children: [
          {
            name: 'salesPlat',
            meta: { title: '全平台销售明细' },
            isNavigator: true,
            path: '',
            component: () => import('./pages/sales/salesPlat.vue'),
          },
          {
            name: 'salesExhibition',
            meta: { title: '展馆销售数据' },
            isNavigator: true,
            path: 'exhibition',
            component: () => import('./pages/sales/exhibition.vue'),
          },
          {
            name: 'salesSite26',
            meta: { title: '26县销售数据' },
            isNavigator: true,
            path: 'site26',
            component: () => import('./pages/sales/site26.vue'),
          },
          {
            name: 'saleSupplier',
            meta: { title: '商家销售数据' },
            isNavigator: true,
            path: 'supplier',
            component: () => import('./pages/sales/supplier.vue'),
          },
          {
            name: 'saleCategory',
            meta: { title: '类目销售数据' },
            isNavigator: true,
            path: 'category',
            component: () => import('./pages/sales/category.vue'),
          },
          {
            path: ':path',
            redirect: '/home/sales',
          },
        ],
      },
      {
        name: 'activities',
        meta: { title: '活动数据' },
        isNavigator: true,
        path: 'activities',
        children: [
          {
            name: 'activitiesActivity',
            meta: { title: '活动销售' },
            isNavigator: true,
            path: '',
            component: () => import('./pages/activities/activity.vue'),
          },
          {
            name: 'activitiesCoupon',
            meta: { title: '优惠券' },
            isNavigator: true,
            path: 'coupon',
            component: () => import('./pages/activities/coupon.vue'),
          },
          {
            name: 'liveData',
            meta: { title: '直播数据' },
            isNavigator: true,
            path: 'liveData',
            component: () => import('./pages/activities/liveData.vue'),
          },
          {
            name: 'activitiesLiveGood',
            meta: { title: '直播商品销量数据' },
            isNavigator: true,
            path: 'liveGood',
            component: () => import('./pages/activities/liveGood.vue'),
          },
          {
            name: 'activitiesGoods',
            meta: { title: '商品排行榜' },
            isNavigator: true,
            path: 'good',
            component: () => import('./pages/activities/good.vue'),
          },
          {
            path: ':path',
            redirect: '/home/activities',
          },
        ],
      },
      {
        name: 'userDatas',
        meta: { title: '用户数据' },
        isNavigator: true,
        path: 'userDatas',
        children: [
          {
            name: 'newUserData',
            meta: { title: '新用户数据' },
            isNavigator: true,
            path: '',
            component: () => import('./pages/userDatas/newUserData.vue'),
          },
          {
            name: 'activeUserData',
            meta: { title: '活动用户数据' },
            isNavigator: true,
            path: 'activeUserData',
            component: () => import('./pages/userDatas/activeUserData.vue'),
          },
          {
            path: ':path',
            redirect: '/home/userDatas',
          },
        ],
      },
      {
        name: 'suppliers',
        meta: { title: '商家数据' },
        isNavigator: true,
        path: 'suppliers',
        children: [
          {
            name: 'examine',
            meta: { title: '商家考核数据' },
            isNavigator: true,
            path: '',
            component: () => import('./pages/suppliers/examine.vue'),
          },
          {
            path: ':path',
            redirect: '/home/suppliers',
          },
        ],
      },
    ],
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('./pages/login/index.vue'),
    meta: { title: '登录' },
  },
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/:path',
    redirect: '/home',
  },
]

const router = createRouter({
  history: createWebHistory(config.path),
  routes: <any>routes,
})

export { routes }

export default router
