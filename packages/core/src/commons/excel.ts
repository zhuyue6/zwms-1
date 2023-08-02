import exceljs from 'exceljs'
import { CTableColumnInstance } from '@/components/index'
import { ElMessageBox, ElMessage } from 'element-plus'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { Ref } from 'vue'

export async function exportExcel(
  route: RouteLocationNormalizedLoaded,
  cTableRef: Ref,
  tableColumns: CTableColumnInstance[],
  name?: string
) {
  const exportName = name
    ? name
    : `${route.meta.title as string}${
        (cTableRef.value?.state?.currentPage - 1) *
          cTableRef.value?.state.pageSize +
        1
      }-${
        cTableRef.value?.state?.currentPage * cTableRef.value?.state?.pageSize
      }`
  const exportData = await cTableRef.value?.getTableData()
  if (exportData.length === 0) {
    return ElMessage.info('暂无数据')
  }

  ElMessageBox.confirm(
    `是否要导出${exportName ? `【${exportName}】` : ''}（仅当前页面展示数据）？`
  ).then(() => {
    const { tabs, list } = getExcelData(tableColumns, exportData ?? [])
    doExportExcel(tabs as string[], list ?? [], exportName)
  })
}

export function doExportExcel(tabs: string[], list: string[][], name?: string) {
  const workbook = new exceljs.Workbook()
  const sheet = workbook.addWorksheet('sheet')
  sheet.addRow(tabs)
  for (const contentRow of list) {
    sheet.addRow(contentRow)
  }
  let link: HTMLAnchorElement | null = document.createElement('a')
  workbook.xlsx.writeBuffer().then((data) => {
    // Blob 实现下载excel
    const blob: Blob = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    })
    ;(<HTMLAnchorElement>link).href = window.URL.createObjectURL(blob)
    ;(<HTMLAnchorElement>link).download = `${name ? name : 'export'}.xlsx`
    ;(<HTMLAnchorElement>link).click()
    link = null
  })
}

export function getExcelData(
  tabsData: CTableColumnInstance[],
  listData: any[]
) {
  const tabs = tabsData.map((item) => item.label)
  const list: string[][] = []
  listData.forEach((listItem, listIndex) => {
    const row: string[] = []
    tabsData.forEach((item) => {
      if (item.type === 'index') {
        row.push(`${listIndex + 1}`)
      } else {
        row.push(listItem[item.prop as string])
      }
    })
    list.push(row)
  })
  return {
    tabs,
    list,
  }
}
