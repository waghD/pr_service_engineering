import { ApiProperty } from '@nestjs/swagger';
import { IAuthResponseDto } from '../../../../../../libs/models/IAuthDto';

export class AuthResponseDto implements IAuthResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  access_token: string;
}
