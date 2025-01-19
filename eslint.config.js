import globals from 'globals'
import js from '@eslint/js'
import prettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.vue'],
    plugins: {
      vue
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
        ecmaFeatures: {
          jsx: true
        },
        sourceType: 'module'
      },
      globals: {
        // Add Vue 3 globals
        ref: 'readonly',
        computed: 'readonly',
        reactive: 'readonly',
        onMounted: 'readonly',
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
        useRuntimeConfig: 'readonly',
        definePageMeta: 'readonly',
        useHead: 'readonly'
      }
    },
    rules: {
      ...vue.configs['vue3-recommended'].rules,
      'vue/multi-word-component-names': 'off'
    }
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    plugins: {
      prettier
    },
    rules: {
      'prettier/prettier': 'error'
    }
  },
  eslintConfigPrettier,
  {
    ignores: ['node_modules/**', '.nuxt/**', 'dist/**', '.output/**']
  }
]
