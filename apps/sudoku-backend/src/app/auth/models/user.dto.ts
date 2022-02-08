import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IAuthDto } from '@models/IAuthDto';

export class UserDto implements IAuthDto {

  @ApiProperty({
    type:String,
    description:"Parameter for the user"})
  @IsNotEmpty()
  username:string;

  @ApiProperty(
    {
      type:String,
      description:"Parameter for the user"
    }
  )
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
