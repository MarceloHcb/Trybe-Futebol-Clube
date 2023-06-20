export type ServiceMessage = { message: string };

type ServiceResponseErrorType = 'UNAUTHORIZED' | 'DUPLICATE' | 'NOT_FOUND' ;

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL',
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
