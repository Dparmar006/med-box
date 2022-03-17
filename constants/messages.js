module.exports = {
  // 400
  TOKEN_NOT_FOUND: {
    success: false,
    responseType: 'TOKEN_NOT_FOUND',
    message: 'Token was not found in request, Please provide.',
    data: null,
    list: null
  },

  // 200
  DATA_RETRIVED_SUCCESSFULLY: {
    success: true,
    responseType: 'DATA_RETRIVED_SUCCESSFULLY',
    message: 'Data retrived successfully.'
  },
  // 201
  RECORD_CREATED: {
    success: true,
    responseType: 'RECORD_CREATED',
    message: 'Record created successfully.'
  },
  // 202
  RECORD_DELETED: {
    success: true,
    responseType: 'RECORD_DELETED',
    message: 'Record deleted successfully.'
  },
  // 204
  RECORD_UPDATED: {
    success: true,
    responseType: 'RECORD_UPDATED',
    message: 'Record updated successfully.'
  },
  // 500
  SERVER_ERROR: {
    success: false,
    responseType: 'SERVER_ERROR',
    message: 'Something bad happened on server.'
  },
  // 401
  UNAUTHORIZED_ACCESS: {
    success: false,
    responseType: 'UNAUTHORIZED_ACCESS',
    message: 'Authentication failed, please try re-login.'
  },
  // 404
  RESOURCE_NOT_FOUND: {
    success: false,
    responseType: 'RESOURCE_NOT_FOUND',
    message:
      "The resource you are looking for is either doesn't exist or has been deleted."
  },
  BAD_REQUEST: {
    success: false,
    responseType: 'BAD_REQUEST',
    message: 'Bad request, Please give all valid details for this action.'
  }
}
