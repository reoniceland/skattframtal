import { grantTypesEnum } from '../db/schema'

export type GrantType = (typeof grantTypesEnum.enumValues)[number]
export type GrantTypeResp = (typeof grantTypesEnum.enumValues)[number]
