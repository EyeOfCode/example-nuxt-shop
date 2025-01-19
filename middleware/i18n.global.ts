export default defineNuxtRouteMiddleware((to) => {
  let lang = 'th'
  if (process.client) {
    lang = sessionStorage.getItem('locale') || 'th'
  }
  const locale = to.path.split('/')[1]
  if (!['en', 'th'].includes(locale)) {
    return navigateTo(`/${lang}${to.path}`)
  }
})
