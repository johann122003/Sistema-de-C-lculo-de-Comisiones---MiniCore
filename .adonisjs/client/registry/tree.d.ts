/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  commissions: {
    index: typeof routes['commissions.index']
    calculate: typeof routes['commissions.calculate']
  }
}
