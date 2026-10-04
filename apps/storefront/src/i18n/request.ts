import { getRequestConfig } from "next-intl/server"

const supportedLocales = ["tr"] as const

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale
  const locale = supportedLocales.includes(
    requestedLocale as (typeof supportedLocales)[number]
  )
    ? requestedLocale
    : "tr"

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
