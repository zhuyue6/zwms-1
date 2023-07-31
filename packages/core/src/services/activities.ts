import { ActivitiesApi } from './api'
import { get } from '@/shared/http'
import { Page, SearchParams, SellGMVDimension, StoreSnapshot, GoodSnapshot, SupplierSnapshot, SiteSnapshot }  from './common'


interface Coupon extends GoodSnapshot {
  couponId: number // 优惠券id
  couponName: string // 优惠券名称
  payment: number  // 实付金额
  sales: number // 销售额
  mobile: string // 手机号（加密）
  address: string  // 地址（加密）
  orderNo: string // 订单编号
  subOrderNo: string // 子订单编号
  supplierName: string //商家名称
  siteName: string // 展馆名称
  sellPrice: number // 单价
  promPrice: number // 活动价
  platDiscount: number // 平台优惠
  storeDiscount: number // 店铺优惠
  sellCount: number // 购买数量
  userId: string // 用户id
  orderStatus: string // 订单状态
  receiveTime: string // 领取时间
}

interface CouponDetailParams extends Page {
  couponIds: string
}

interface CouponDetailResponse extends Page {
  rows: Coupon[]
}

export async function getCouponDetail(params: CouponDetailParams) {
  return get<CouponDetailResponse, CouponDetailParams>(ActivitiesApi.couponDetail, params)
}

interface PromSale extends SellGMVDimension {
  promId: number //活动id
  promName: string //活动名称
}

interface PromSalesParams extends SearchParams {
  promIds: string
}

interface PromSalesResponse extends Page {
  rows: PromSale[]
}

export async function getPromSales(params: PromSalesParams) {
  return get<PromSalesResponse, PromSalesParams>(ActivitiesApi.promSales, params)
}

interface GoodsSales extends SellGMVDimension, StoreSnapshot, GoodSnapshot, SupplierSnapshot, Omit<SiteSnapshot, 'siteName'> {}

interface GoodsSalesParams extends SearchParams {
  goodsIds: string
  siteIds: string
  supplierIds: string
  storeIds: string
}

interface GoodsSalesResponse extends Page {
  rows: GoodsSales[]
}

export async function getGoodsSales(params: GoodsSalesParams) {
  return get<GoodsSalesResponse, GoodsSalesParams>(ActivitiesApi.goodsSales, params)
}


interface LiveGoodSales extends SellGMVDimension, GoodSnapshot, Pick<SupplierSnapshot, 'supplierName'> {
  activityId: string
}

interface LiveSalesParams extends SearchParams {
  activityIds: string
}

interface LiveGoodSalesResponse extends Page {
  rows: LiveGoodSales[]
}

export async function getLiveGoodSales(params: LiveSalesParams) {
  return get<LiveGoodSalesResponse, LiveSalesParams>(ActivitiesApi.liveGoodSales, params)
}

interface LiveSalesTotalSales extends SellGMVDimension {
  activityId: string
  title: string
}

interface LiveSalesTotalResponse extends Page {
  rows: LiveSalesTotalSales[]
}

export async function getLiveSalesTotalSales(params: LiveSalesParams) {
  return get<LiveSalesTotalResponse, LiveSalesParams>(ActivitiesApi.liveSalesTotal, params)
}