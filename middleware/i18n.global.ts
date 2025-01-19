export default defineNuxtRouteMiddleware((to) => {
  const i18n = useNuxtApp().$i18n
  const locale = i18n.locale || i18n.defaultLocale
  if (to.fullPath.startsWith(`/${locale.value}`)) {
    i18n.setLocale(locale.value)
  } else {
    return navigateTo(`/${locale.value}${to.fullPath}`)
  }
})
