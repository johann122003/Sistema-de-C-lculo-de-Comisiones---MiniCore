/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'commissions.index': {
    methods: ["GET","HEAD"]
    pattern: '/comisiones'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commissions_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commissions_controller').default['index']>>>
    }
  }
  'commissions.calculate': {
    methods: ["POST"]
    pattern: '/comisiones/calcular'
    types: {
      body: ExtractBody<InferInput<(typeof import('#start/validator').commissionCalculateValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#start/validator').commissionCalculateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commissions_controller').default['calculate']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commissions_controller').default['calculate']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
}
