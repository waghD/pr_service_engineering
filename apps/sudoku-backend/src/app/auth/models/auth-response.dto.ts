import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {

  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  access_token: string;
}
