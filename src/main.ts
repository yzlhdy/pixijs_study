import { createApp } from 'vue'
import { setupAssets } from './plugins'
import AppLoading from './components/AppLoading.vue'
import { setupI18n } from './locales'
import { setupRouter } from './router'
import gsapDirective from './directives/gsapDirective'

import App from './App.vue'

async function setupApp() {
  /* loading */
  const appLoading = createApp(AppLoading)
  appLoading.mount('#appLoading')

  // import assets: js、css
  setupAssets()

  const app = createApp(App)
  app.directive('gsap', gsapDirective)
  /* i18n */
  setupI18n(app)

  // vue router
  await setupRouter(app)
  // mount app
  app.mount('#app')
}

setupApp()
