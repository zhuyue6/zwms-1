import darkStyles from '../styles/themes/dark.module.scss'
import lightStyles from '../styles/themes/light.module.scss'
import { useThemeInfo } from '@zwms/hooks'
import { util } from '@zwms/shared'
interface Theme {
  [index: string]: string
}

interface Themes {
  [index: string]: Theme
}

const themes: Themes = {
  dark: darkStyles,
  light: lightStyles,
}

const themeInfo = useThemeInfo()

export function setInitTheme() {
  const queryTheme = util.getUrlQuery('theme')
  let theme = util.getStorage('theme') ?? 'dark'
  if (queryTheme) theme = queryTheme
  setTheme(theme)
  util.setStorage('theme', theme)
}

export function setTheme(theme: keyof typeof themes) {
  const styles: Theme = themes[theme]
  const htmlElement: HTMLElement = document.querySelector(
    ':root'
  ) as HTMLElement
  htmlElement.style.setProperty('color-scheme', theme as string)
  themeInfo.colorScheme = <string>theme
  themeInfo.styles = styles
  for (const [key, value] of Object.entries(styles)) {
    document.documentElement.style.setProperty(`--${key}`, value)
  }
}
