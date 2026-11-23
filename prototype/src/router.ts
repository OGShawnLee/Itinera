import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { ITEMS } from './domain/catalogo'
import type { ItemId } from './domain/types'
import { app, fijarLimpio, restablecerDatosDePrueba } from './store'

declare module 'vue-router' {
  interface RouteMeta {
    requiereMoto?: boolean
  }
}

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  // Excepción documentada del prototipo: /onboarding siempre es accesible y al terminar reemplaza la moto.
  { path: '/onboarding', component: () => import('./views/OnboardingView.vue') },
  { path: '/home', component: () => import('./views/HomeView.vue'), meta: { requiereMoto: true } },
  { path: '/history', component: () => import('./views/HistoryView.vue'), meta: { requiereMoto: true } },
  {
    path: '/history/:logId',
    component: () => import('./views/LogDetailView.vue'),
    meta: { requiereMoto: true },
    beforeEnter: (to) =>
      app.registros.some((r) => r.id === to.params.logId) ? true : { path: '/history', replace: true },
  },
  { path: '/settings', component: () => import('./views/SettingsView.vue'), meta: { requiereMoto: true } },
  { path: '/settings/intervals', component: () => import('./views/IntervalsView.vue'), meta: { requiereMoto: true } },
  { path: '/calibrate', component: () => import('./views/CalibrateView.vue'), meta: { requiereMoto: true } },
  {
    path: '/consumable/:id',
    component: () => import('./views/ConsumableView.vue'),
    meta: { requiereMoto: true },
    beforeEnter: (to) =>
      ITEMS.includes(to.params.id as ItemId) ? true : { path: '/home', replace: true },
  },
  { path: '/log-service', component: () => import('./views/LogServiceView.vue'), meta: { requiereMoto: true } },
  { path: '/export', component: () => import('./views/ExportView.vue'), meta: { requiereMoto: true } },
  // Rutas de demostración del prototipo (no son pantallas de la app del conductor).
  { path: '/notificaciones', component: () => import('./views/NotificacionesView.vue'), meta: { requiereMoto: true } },
  { path: '/comercio', component: () => import('./views/ComercioView.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/home' },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach((to) => {
  if (to.query.clean === '1') fijarLimpio(true)
  if (to.query.clean === '0') fijarLimpio(false)
  if (to.query.seed === '1') restablecerDatosDePrueba()
  if (to.meta.requiereMoto && !app.vehiculo) return { path: '/onboarding', replace: true }
  return true
})
