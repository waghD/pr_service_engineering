
export interface IAuthDto {
  username:string;
  password:string;
}

export interface IAuthResponseDto {
  id: number;
  username: string;
  access_token: string;
}

export interface IAuthErrorDto {
  error: {
    statusCode: 401 | 402;
    message: string;
  }
}
