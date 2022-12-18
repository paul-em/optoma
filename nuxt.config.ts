import pkg from './package.json';

// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerPath = process.env.DEPLOY_ENV === 'GH_PAGES' ? `/${pkg.name}/` : '/';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    strict: true
  },
  router: {
    base: routerPath,
  }
})
