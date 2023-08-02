import { post } from '@/services/http'
import { OrderApi } from './api'

interface SupplierExamineParams {}

interface SupplierExamine {
  deliveryTimeRankStar: number // 近30天发货时长排名分
  disputeRefundRankStar: number // 近30天纠纷退款排名分
  primaryCategoryId: number // 近90天主营类目
  primaryCategoryName: string // 近90天主营类目名称
  qualityRefundRankStar: number // 近30天品质退款排名分
  refundTimeRankStar: number // 近30天退款时长排名分
  salesRankStar: number // 近30天销售排名分
  storeId: number // 店铺id
  storeName: string // 店铺名称
  supplierId: number // 商家id
  supplierName: string //商家名称
  thirtyDeliveryTime: number // 近30天平均发货时长
  thirtyDisputeRefundRatio: number // 近30天纠纷退款率
  thirtyOrderCount: number // 近30日订单数量
  thirtyQualityRefundRatio: number // 近30天品质退款率
  thirtyRefundTime: number // 近30天平均退款时长
  thirtySales: number // 近30日销售额
  time: number // 时间yyyymmdd
}

interface SupplierExamineResponse {
  records: SupplierExamine[]
  total: number
}

export async function getSupplierExamine(params: SupplierExamineParams) {
  return post<SupplierExamineResponse, SupplierExamineParams>(
    OrderApi.getSupplierExamine,
    params
  )
}
