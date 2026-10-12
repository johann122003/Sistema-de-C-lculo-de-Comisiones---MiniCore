import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'commissions.index': { paramsTuple?: []; params?: {} }
    'commissions.calculate': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'commissions.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'commissions.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'commissions.calculate': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}