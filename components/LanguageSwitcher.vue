<template>
  <select class="mx-2 rounded-md" :value="locale" @change="$i18n.setLocale($event.target.value)">
    <option value="en" :selected="locale === 'en'">EN</option>
    <option value="th" :selected="locale === 'th'">TH</option>
  </select>
</template>
<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
</script>
