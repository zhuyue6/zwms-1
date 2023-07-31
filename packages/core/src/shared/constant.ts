// 新用户数据列表页相关字段
export const userDataKeys = {
  createTime: { label: '用户注册时间', prop: 'createTime', width: '', sortable: true },
  firstOrderTime: { label: '用户下单时间', prop: 'firstOrderTime', width: '', sortable: true },
  firstOrderSale: { label: '首单GMV', prop: 'firstOrderSale', width: '', sortable: true },
  firstOrderPaysAmount: {
    label: '首单实付',
    prop: 'firstOrderPaysAmount',
    width: '',
    sortable: true
  },
  isUsedNewCoupons: {
    label: '是否使用5元（首单）优惠券',
    prop: 'isUsedNewCoupons',
    width: '230',
    sortable: true
  },
}

// 活动用户数据列表页相关字段
export const activeUserDataKeys = {
  addUserCount: { label: '新增用户数（人）', prop: 'addUserCount', width: '', sortable: true },
  rate: { label: '注册用户转化率', prop: 'rate', width: '', sortable: true },
  orderUserCount: { label: '下单用户数', prop: 'orderUserCount', width: '', sortable: true },
}

const suppliersDataKeys = {
  primaryCategoryName: {
    prop: 'primaryCategoryName',
    label: '主营类目',
    tip: '近90天内，店铺内销量最高的商品的二级类目。统计周期：T-91~T-1',
    width: '150'
  },
  thirtySales: {
    prop: 'thirtySales',
    label: '30天销售额',
    width: '150',
    sortable: 'custom',
    sortProp: 1,
  },
  salesRankStar: {
    prop: 'salesRankStar',
    label: '销售排名分',
    width: '150',
    sortable: 'custom',
    sortProp: 2
  },
  thirtyOrderCount: {
    prop: 'thirtyOrderCount',
    label: '30天订单数',
    width: '150',
    sortable: 'custom',
    sortProp: 3
  },
  thirtyQualityRefundRatio: {
    prop: 'thirtyQualityRefundRatio',
    label: '30天品质退款率',
    tip: `近30天内，以品质退款理由发起的成功退款数/店铺支付子订单数。统计周期：T-37~T-8。品质退款理由包含：商品与描述不符、商品质量变质/发霉/有异物、生产日期/保质期问题、商品/包装破损、商家门店与实际情况不符`,
    width: '180',
    sortable: 'custom',
    sortProp: 4
  },
  qualityRefundRankStar: {
    prop: 'qualityRefundRankStar',
    label: '品质退款排名分',
    width: '180',
    sortable: 'custom',
    sortProp: 5
  },
  thirtyDisputeRefundRatio: {
    prop: 'thirtyDisputeRefundRatio',
    label: '30天纠纷退款率',
    tip: `近30天内，店铺纷退款笔数/店铺支付子订单数。统计周期：T-37~T-8。纠纷退款定义：买卖家申请介入后，由平台客服人工处理，且判定为支持买家的退款。支付订单数按交易子订单数计算（SKU维度），按退款成功时间计算。`,
    width: '180',
    sortable: 'custom',
    sortProp: 6
  },
  disputeRefundRankStar: {
    prop: 'disputeRefundRankStar',
    label: '纠纷退款排名分',
    width: '180',
    sortable: 'custom',
    sortProp: 7
  },
  thirtyRefundTime: {
    prop: 'thirtyRefundTime',
    label: '30天退款时长(h)',
    width: '180',
    sortable: 'custom',
    sortProp: 8
  },
  refundTimeRankStar: {
    prop: 'refundTimeRankStar',
    label: '退款时长排名分',
    width: '180',
    sortable: 'custom',
    sortProp: 9
  },
  thirtyDeliveryTime: {
    prop: 'thirtyDeliveryTime',
    label: '30天发货时长(h)',
    width: '180',
    sortable: 'custom',
    sortProp: 10
  },
  deliveryTimeRankStar: {
    prop: 'deliveryTimeRankStar',
    label: '发货时长排名分',
    width: '180',
    sortable: 'custom',
    sortProp: 11
  }
}

export const tableColumnPresets = {
  ...userDataKeys,
  ...activeUserDataKeys,
  ...suppliersDataKeys,
  time: {
    label: '时间',
    width: '200',
    prop: 'time',
    sortable: true,
  },
  rank: {
    label: '排名',
    width: '100',
    prop: 'columnIndex',
    sortable: true,
  },
  activityId: {
    prop: 'activityId',
    label: '直播间ID',
    width: '160',
    sortable: true,
  },
  title: {
    prop: 'title',
    label: '名称',
    width: '250',
    sortable: true,
  },
  goodsId: {
    prop: 'goodsId',
    label: '商品ID',
  },
  storeName: {
    prop: 'storeName',
    label: '店铺名称',
    sortable: true,
    width: '250',
  },
  goodsName: {
    prop: 'goodsName',
    label: '商品名称',
    sortable: true,
    width: '250',
  },
  gmv: {
    prop: 'gmv',
    label: 'GMV',
    sortable: true,
    width: '160',
  },
  categoryName: {
    prop: 'categoryName',
    label: '类目',
    width: '250',
  },
  orderNo: {
    prop: 'orderNo',
    label: '订单编号',
    sortable: true,
    width: '200',
  },
  gmvOrderCount: {
    prop: 'gmvOrderCount',
    label: '订单数（GMV）',
    sortable: true,
    width: '180',
  },
  gmvGoodsSellCount: {
    prop: 'gmvGoodsSellCount',
    label: '商品销量（GMV）',
    sortable: true,
    width: '200',
  },
  sales: {
    prop: 'sales',
    label: '销售额',
    sortable: true,
    width: '120',
  },
  salesOrderCount: {
    prop: 'salesOrderCount',
    label: '订单数（销售额）',
    sortable: true,
    width: '180',
  },
  salesGoodsSellCount: {
    prop: 'salesGoodsSellCount',
    label: '商品销量（销售额）',
    sortable: true,
    width: '180',
  },
  couponId: {
    prop: 'couponId',
    label: '优惠券ID',
    width: '180',
  },
  couponName: {
    prop: 'couponName',
    label: '优惠券名称',
    width: '200',
  },
  subOrderNo: {
    prop: 'subOrderNo',
    label: '子订单编号',
    sortable: true,
    width: '180',
  },
  siteName: {
    prop: 'siteName',
    label: '展馆名称',
    sortable: true,
    width: '150',
  },
  supplierName: {
    prop: 'supplierName',
    label: '商家名称',
    sortable: true,
    width: '250',
  },
  sellPrice: {
    prop: 'sellPrice',
    label: '单价',
    sortable: true,
    width: '100',
  },
  promPrice: {
    prop: 'promPrice',
    label: '活动价',
    sortable: true,
    width: '100',
  },
  platDiscount: {
    prop: 'platDiscount',
    label: '平台优惠',
    sortable: true,
    width: '120',
  },
  storeDiscount: {
    prop: 'storeDiscount',
    label: '店铺优惠',
    sortable: true,
    width: '120',
  },
  sellCount: {
    prop: 'sellCount',
    label: '购买数量',
    sortable: true,
    width: '120',
  },
  payment: {
    prop: 'payment',
    label: '实付',
    sortable: true,
    width: '100',
  },
  userId: {
    prop: 'userId',
    label: '用户ID',
    sortable: true,
    width: '150',
  },
  mobile: {
    prop: 'mobile',
    label: '手机号',
    sortable: true,
    width: '150',
  },
  address: {
    prop: 'address',
    label: '收货地址',
    sortable: true,
    width: '150',
  },
  orderStatus: {
    prop: 'orderStatus',
    label: '订单状态',
    sortable: true,
    width: '120',
  },
  receiveTime: {
    prop: 'receiveTime',
    label: '领取时间',
    sortable: true,
    width: '200',
  },
  promId: {
    prop: 'promId',
    label: '活动ID',
    width: '150',
    sortable: true,
  },
  promName: {
    prop: 'promName',
    label: '活动名称',
    width: '250'
  },
  siteId: {
    prop: 'siteId',
    label: '展馆ID',
    sortable: true,
    width: '200',
  },
  storeId: {
    prop: 'storeId',
    label: '店铺ID',
    width: '180',
  }
}
