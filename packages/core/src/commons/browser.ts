import { ElNotification } from 'element-plus'
import { util } from '@zwms/shared'

export function browserDetermine() {
  const browser = util.getStorage('browserDetermine')
  if (!browser && !util.isChrome()) {
    ElNotification({
      message: '请使用Chrome浏览器获取更好体验。',
      duration: 0,
      type: 'warning',
    })
    util.setStorage('browserDetermine', true)
  }
}
