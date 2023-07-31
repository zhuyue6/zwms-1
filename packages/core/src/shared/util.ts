import exceljs from 'exceljs'
import { CTableColumnInstance } from '@/components/index'
import { ElMessageBox, ElMessage, ElNotification } from 'element-plus'
import { RouteLocationNormalizedLoaded } from "vue-router"
import { Ref } from 'vue'
import moment from 'moment'

export function getUrlQuerys(): Record<string, unknown> | null {
  let query: Record<string, unknown> | null = null
  const queryArray = window.location.search
    .substring(1)
    .split('&')
    .filter((item) => item !== '')
  if (queryArray.length > 0) {
    const reg = /(\S*)=(\S*)/
    query = {}
    for (const queryItem of queryArray) {
      const r = queryItem.match(reg)
      if (r != null) {
        query[r[1]] = decodeURI(r[2])
      }
    }
  }
  return query
}

export function getUrlQuery(name: string): string | null {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const r = window.location.search.substring(1).match(reg)
  if (r != null) {
    return decodeURI(r[2])
  }
  return null
}

export function setStorage(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function clearStorage(key?: string): void {
  if (key !== undefined) {
    return localStorage.removeItem(key)
  }
  localStorage.clear()
};

export function getStorage(key: string): any {
  let data = localStorage.getItem(key)
  try {
    data = JSON.parse(data as string)
  } catch {}
  return data
}

export function simpleDeepCopy(data: Record<string, unknown> | unknown[]) {
  return JSON.parse(JSON.stringify(data))
}

export async function exportExcel(route: RouteLocationNormalizedLoaded, cTableRef: Ref, tableColumns: CTableColumnInstance[], name?: string) {
  const exportName = name ? name : `${route.meta.title as string}${(cTableRef.value?.state?.currentPage - 1) * cTableRef.value?.state.pageSize + 1}-${cTableRef.value?.state?.currentPage * cTableRef.value?.state?.pageSize}`
  const exportData = await cTableRef.value?.getTableData()
  if (exportData.length === 0) {
    return ElMessage.info('暂无数据')
  }

  ElMessageBox.confirm(`是否要导出${exportName ? `【${exportName}】` : ''}（仅当前页面展示数据）？`)
    .then(() => {
        const {tabs, list} = getExcelData(tableColumns, exportData ?? [])
        doExportExcel(tabs as string[], list ?? [], exportName)
    })
}

export function doExportExcel(tabs: string[], list: string[][], name?: string) {
  const workbook = new exceljs.Workbook();
  const sheet = workbook.addWorksheet('sheet');
  sheet.addRow(tabs); 
  for (const contentRow of list) {
    sheet.addRow(contentRow); 
  }
  let link: HTMLAnchorElement | null = document.createElement('a');
  workbook.xlsx.writeBuffer().then((data) => {
    // Blob 实现下载excel
    const blob: Blob = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    (<HTMLAnchorElement>link).href = window.URL.createObjectURL(blob);
    (<HTMLAnchorElement>link).download = `${name ? name : 'export'}.xlsx`;
    (<HTMLAnchorElement>link).click();
    link = null
  });
}

export function getExcelData(tabsData: CTableColumnInstance[], listData: any[]) {
  const tabs = tabsData.map((item) => item.label)
  const list: string[][] = [];
  listData.forEach((listItem, listIndex)=>{
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
    list
  }
}

export function isEmpty(data: undefined | null | string) {
  return data === undefined || data === null || data === ''
}

export function isChrome(): boolean {
  return window.navigator.userAgent.toLocaleLowerCase().indexOf('chrome') !== -1
}

export function browserDetermine() {
  const browser = getStorage('browserDetermine')
  if (!browser && !isChrome()) {
    ElNotification({
      message: '请使用Chrome浏览器获取更好体验。',
      duration: 0,
      type: 'warning',
    })
    setStorage('browserDetermine', true)
  }
}

export function transformListParams(data: string | string[], type='string'): string | string[] {
  let text: string | string [] = type === 'string' ? '[]' : []
  if (Array.isArray(data)) {
    text = type === 'string' ? JSON.stringify(data) : []
  } else if (typeof data === 'string' && data !== '') {
    const dataT = data.replaceAll('，', ',').split(',')
    text = type === 'string' ? JSON.stringify(dataT) : dataT
  }
  return text
}


export function formatTime(timeString: string | number): string {
  if (!timeString) {
    return ''
  }
  return moment(timeString).format('YYYY-MM-DD')
}