import { Allow, IsNotEmpty } from 'class-validator';


export class UserDto{

  @IsNotEmpty()
  name:string;

  @Allow()
  password:string;

}
