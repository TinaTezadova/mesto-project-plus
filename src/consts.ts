export const findByIdAndUpdateParams = {
  new: true,
  runValidators: true
}

export enum StatusCode {
  SUCSESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500
}