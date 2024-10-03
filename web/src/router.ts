import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/check-autostore-label`
  | `/print-expedition-label`
  | `/waybills`
  | `/waybills/:waybillId/pallets/:palletId/scan`
  | `/waybills/:waybillId/pallets/scan`
  | `/waybills/:waybillId/scan`
  | `/waybills/new`

export type Params = {
  '/waybills/:waybillId/pallets/:palletId/scan': { waybillId: string; palletId: string }
  '/waybills/:waybillId/pallets/scan': { waybillId: string }
  '/waybills/:waybillId/scan': { waybillId: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
