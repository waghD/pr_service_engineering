
export interface IAuthDto {
  username:string;
  password:string;
}

export interface IAuthResponseDto {
  id: number;
  username: string;
  access_token: string;
}
