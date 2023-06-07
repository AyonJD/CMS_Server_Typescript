export interface IGenericErrorMessage {
  message: string
  path: string
}

export interface IGenericErrorResponse {
  status: string
  statusCode: number
  message: string
  errorMessages: IGenericErrorMessage[]
}
