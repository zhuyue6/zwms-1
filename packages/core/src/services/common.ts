import { get } from '@/services/http'
import { UserApi, GoodsApi, OrderApi } from '@/services/api'
interface regionParams {
  regionCode: string | number
}

export interface Region {
  pid: string
  regionCode: string
  regionName: string
  type: string
}

export async function getChildRegion(params: regionParams) {
  return get<Region[], regionParams>(
    UserApi.getChildRegion,
    params,
    undefined,
    false
  )
}

interface siteParams {
  site_id: string
}

export interface Site {
  areaCode: number
  childSiteList: unknown
  childSiteNum: number
  children: unknown
  cityCode: number
  codeId: string
  createTime: string
  desc: string
  goodsNum: number
  goodsQueries: unknown
  id: string
  imageUrl: string
  isRecommend: number
  jumpUrl: string
  parentSiteId: string
  projectCode: string
  provinceCode: string
  recommendGoodsList: unknown
  recommendTime: string
  regionName: string
  relationId: string
  siteIcon: string
  siteId: string
  siteName: string
  siteType: number
  sort: number
  status: number
  suppliersNum: number
  tempId: string
  tempUrl: string
  wechatMiniCode: string
}

export async function getSiteChild(params: siteParams) {
  return get<Site[], siteParams>(
    GoodsApi.getSiteChild,
    params,
    undefined,
    false
  )
}

export interface Category {
  attributeNum: number
  brandNum: number
  children: Category[]
  childrenNum: number
  code: number
  createTime: number
  goodsNum: number
  id: string
  isDelete: number
  isLeaf: number
  level: string
  name: string
  parentId: number
  parentIdPath: string
  projectCode: string
  specNum: number
  status: number
  supplierTagNum: number
  updateId: string
  updateName: string
  updateTime: number
}

interface CategoryParams {
  currentPage: string | number
  pageSize: string | number
  parentId: string | number
  isBackendList: string | number
  level: number | undefined
}

interface CategoryResponse {
  records: Category[]
  size: string
  total: string
  pages: string
  current: string
}

export async function getCategory(params: CategoryParams) {
  return get<CategoryResponse, CategoryParams>(
    GoodsApi.getBackendCategory,
    params,
    undefined,
    false
  )
}

export interface TradeProm {
  approvedPromGoodsNum: number // 报名成功商品数量
  auditTime: number // 审核时常（天）
  content: string // 活动描述
  details: string // 活动详情
  discountsCondition: number // 优惠条件
  discountsValue: number // 优惠金额
  eachPersonLimit: number // 每人限购(0不限制，其他表示限购数量)
  editOkOrNot: number // 是否可以编辑：0、可以 1、不可以
  endTime: 'string' // 报名结束时间
  everydayLimit: number // 每天限购(0不限制，其他表示限购数量)
  id: number //活动id
  imageIds: string // 封面id
  isShow: number // 商家端是否展示（0：展示，1：不展示）
  label: string // 标签
  mutexPromList: {
    id: number // 活动id
    title: string // 活动名称
    type: number // 活动类型：1-秒杀，2-大促，4-限时抢购，5-新人专享 , 6-跨店满减
  }[] // 互斥活动list
  notAuditPromGoodsNum: number // 待审核商品数量
  okOrNot: boolean //  是否符合报名条件
  preheatImage: string // 预热图片
  preheatStarttime: string // 活动预热时间
  projectCode: string // 登录端
  promSchedule: number // 活动进度：1、未开始 2、进行中 3、已结束
  rejectedPromGoodsNum: number // 已驳回商品数量
  responsibilityRatio: number // 商家承担比例
  schedule: number // 进度：1、未开始 2、进行中 3、已结束
  showEndtime: string //活动结束时间
  showStarttime: string // 活动开始时间
  startTime: string //报名开始时间
  status: number // 状态（0：上架，1：下架）
  title: string //  活动名称
  type: number // 活动类型：1-秒杀，2-大促，4-限时抢购，5-新人专享
}

export interface TradePromParams {
  currPage: string | number
  pageSize: string | number
}

interface TradePromResponse {
  records: TradeProm[]
  current: string
  pages: string
  size: string
  total: string
}

export async function getTradePromList(params: TradePromParams) {
  return get<TradePromResponse, TradePromParams>(
    OrderApi.getTradePromList,
    params,
    undefined,
    false
  )
}

export interface Page {
  pageNum?: number // 分页默认参数：页编号
  pageSize?: number // 分页默认参数：页大小
  totalNum?: number // 总条数
  currentPage?: number // 页默认参数：页编号
}

export interface SearchParams {
  projectCode?: string | null
  beginTime?: string
  endTime?: string
  sortValue?: 'sales' | 'gmv'
}

export interface SellGMVDimension {
  gmv: string // gmv
  sales: string // 销售额
  gmvGoodsSellCount: string // gmv维度商品销售数量
  salesGoodsSellCount: string // 销售额维度商品销售数量
  gmvOrderCount: string // gmv维度订单数量
  salesOrderCount: string // 销售额维度订单数量
}

export interface StoreSnapshot {
  storeId: number //店铺id
  storeName: string // 店铺名称
}

export interface GoodSnapshot {
  goodsId: number // 商品id
  goodsName: string // 商品名称
}
export interface SupplierSnapshot {
  supplierId: number // 商家id
  supplierName: string // 商家名称
}

export interface SiteSnapshot {
  siteId: number // 展馆Id
  siteName: string // 展馆名称
}

export interface CategorySnapshot {}
export interface newUserDataSnapshot {
  userId: string // 用户id
  firstOrderPaysAmount: string // 首单实付金额
  firstOrderSale: string // 首单销售额
  isUsedNewCoupons: string // 是否使用新人专享券
  isUsedNewCoupon: number // 是否使用新人专享券
  createTime: string // 创建时间
  firstOrderTime: string // 首单时间
}
export interface activeUserDataSnapshot {
  title: string // 活动标题
  addUserCount: string // 新增用户数（人）
  rate: string // 注册用户转化率
  orderUserCount: string // 下单用户数
  time: string
}

export function getOneLevelCategory() {
  return get<Category[]>(GoodsApi.getOneLevelCategory)
}
