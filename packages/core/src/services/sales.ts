import { SalesApi } from './api'
import { get } from '@/shared/http'
import { Page, SearchParams, SellGMVDimension, StoreSnapshot, SupplierSnapshot, SiteSnapshot, CategorySnapshot }  from './common'

interface SalesSite26Params {
  beginTime: string // 开始时间（包含该时间）
  endTime: string // 结束时间（包含该时间）
}

interface SalesSite extends SellGMVDimension, SiteSnapshot {}

type SalesSite26Response = SalesSite[]

export async function getSalesSite26(params: SalesSite26Params) {
  return get<SalesSite26Response, SalesSite26Params>(SalesApi.site26, params)
}

interface SalesSiteSalesParams extends SearchParams, Page {
  siteIds: string
}

interface SiteSalesResponse extends Page {
  rows: SalesSite[]
}

export async function getSiteSales(params: SalesSiteSalesParams) {
  return get<SiteSalesResponse, SalesSiteSalesParams>(SalesApi.siteSales, params)
}

interface SalesCategorySalesParams  extends SearchParams, Page  {
  siteIds: string
  categoryIds: string
}

interface SalesCategorySite extends SalesSite, CategorySnapshot {}

interface CategorySalesResponse extends Page {
  rows: SalesCategorySite[]
}

export async function getCategorySales(params: SalesCategorySalesParams) {
  return get<CategorySalesResponse, SalesCategorySalesParams>(SalesApi.categorySales, params)
}


interface SalesSupplierParams extends SearchParams {
  supplierIds: string
  storeIds: string
  siteIds: string
  goodsIds: string
}

interface SalesSupplier extends SalesSite, SupplierSnapshot, StoreSnapshot {}

interface SupplierSalesResponse extends Page {
  rows: SalesSupplier[]
}

export async function getSupplierSales(params: SalesSupplierParams) {
  return get<SupplierSalesResponse, SalesSupplierParams>(SalesApi.supplierSales, params)
}

export async function getPlatSales(params: SearchParams) {
  return get<SellGMVDimension[], SearchParams>(SalesApi.platSales, params)
}