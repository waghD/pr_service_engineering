import { Allow, IsNotEmpty } from 'class-validator';

export class UserDto{

  @IsNotEmpty()
  username:string;

  @Allow()
  password:string;

}

export class UserData {
  id: number;
  username: string;
}

export interface AuthenticatedRequest {
  user: UserData
}
