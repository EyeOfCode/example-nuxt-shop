<template>
  <select class="mx-2 rounded-md" :value="locale" @change="switchLanguage($event.target.value)">
    <option value="en" :selected="locale === 'en'">EN</option>
    <option value="th" :selected="locale === 'th'">TH</option>
  </select>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { locale } = useI18n()
const router = useRouter()

const switchLanguage = async (newLocale) => {
  try {
    // Get current route
    const currentRoute = router.currentRoute.value

    // Create new path with new locale
    const newPath = `/${newLocale}${currentRoute.path.substring(3)}`

    // Navigate to new path
    await router.push(newPath)

    // Update locale after navigation
    locale.value = newLocale
  } catch (error) {
    console.error('Failed to switch language:', error)
  }
}
</script>
