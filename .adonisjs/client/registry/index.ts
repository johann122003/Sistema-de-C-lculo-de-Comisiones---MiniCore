/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'commissions.index': {
    methods: ["GET","HEAD"],
    pattern: '/comisiones',
    tokens: [{"old":"/comisiones","type":0,"val":"comisiones","end":""}],
    types: placeholder as Registry['commissions.index']['types'],
  },
  'commissions.calculate': {
    methods: ["POST"],
    pattern: '/comisiones/calcular',
    tokens: [{"old":"/comisiones/calcular","type":0,"val":"comisiones","end":""},{"old":"/comisiones/calcular","type":0,"val":"calcular","end":""}],
    types: placeholder as Registry['commissions.calculate']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
