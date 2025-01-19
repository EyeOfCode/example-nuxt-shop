/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    './node_modules/flowbite/**/*.{js,ts}'
  ],
  theme: {
    extend: {}
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('flowbite/plugin')]
}
