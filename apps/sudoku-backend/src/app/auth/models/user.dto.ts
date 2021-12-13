import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IAuthDto } from '../../../../../../libs/models/IAuthDto';

export class UserDto implements IAuthDto {

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

export interface OptionalAuthRequest {
  user: UserData | false;
}
