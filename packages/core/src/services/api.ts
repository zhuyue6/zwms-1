enum TestService {
  ORDER = '',
  GOODS = '',
  USER = '',
  MANAGE = '',
  COMMENT = '',
  MARKETING = '',
}

enum OnlineService {
  ORDER = '',
  GOODS = '',
  USER = '',
  MANAGE = '',
  COMMENT = '',
  MARKETING = '',
}

enum PreService {
  ORDER = '',
  GOODS = '',
  USER = '',
  MANAGE = '',
  COMMENT = '',
  MARKETING = '',
}

const NbService = {
  test: TestService,
  pre: PreService,
  online: OnlineService,
}

;(window as any).VITE_ENV = import.meta.env.VITE_ENV

const nbUserBase = NbService[VITE_ENV]['USER']

const UserApi = {
  login: nbUserBase + 'backplat/login',
  logout: nbUserBase + 'backplat/logout',
  getChildRegion: nbUserBase + 'common/getChildRegion',
}

const nbGoodsBase = NbService[VITE_ENV]['GOODS']
const GoodsApi = {
  getSiteChild: nbGoodsBase + 'backplat/site/child',
  getBackendCategory: nbGoodsBase + 'backplat/backend_category/list',
  getOneLevelCategory:
    nbGoodsBase + '/backplat/backend_category/getOneLevelCategory',
}

const nbOrderBase = NbService[VITE_ENV]['ORDER']
const OrderApi = {
  getTradePromList: nbOrderBase + 'backplat/tradeProm/list',
  getSupplierExamine: nbOrderBase + 'mallorder/store/grade/dataHouse/query',
}

// datawork阿里云只有线上地址
const aliBase = ''

export const appCode = ''

const SalesApi = {
  site26: aliBase + 'query/site26/sales',
  siteSales: aliBase + 'query/site/sales',
  categorySales: aliBase + 'query/site/category/sales',
  supplierSales: aliBase + 'query/supplier/sales',
  platSales: aliBase + 'plat/sales',
}

const ActivitiesApi = {
  couponDetail: aliBase + 'query/coupon/use',
  promSales: aliBase + 'query/prom/sales',
  goodsSales: aliBase + 'query/goods/sales',
  liveGoodSales: aliBase + 'query/live/goods/sales',
  liveSalesTotal: aliBase + 'query/live/salesTotal',
}

const UserDatasApi = {
  userData: aliBase + 'query/base/user', // 根据时间查询用户信息首单信息
  activeUser: aliBase + 'query/activity/user', // 查询活动用户数据
}

const SuppliersApi = {
  userData: aliBase + 'query/base/user', // 根据时间查询用户信息首单信息
  activeUser: aliBase + 'query/activity/user', // 查询活动用户数据
}

export {
  UserApi,
  GoodsApi,
  OrderApi,
  SalesApi,
  ActivitiesApi,
  UserDatasApi,
  SuppliersApi,
}
