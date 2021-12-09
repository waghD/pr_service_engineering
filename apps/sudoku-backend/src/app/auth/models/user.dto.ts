import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto{

  @ApiProperty()
  @IsNotEmpty()
  username:string;

  @ApiProperty()
  @IsNotEmpty()
  password:string;

}

export class UserData {
  id: number;
  username: string;
}

export interface AuthenticatedRequest {
  user: UserData
}
