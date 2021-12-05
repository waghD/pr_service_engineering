import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class UserEntity{

  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  name:string;

  @Column({select:false})
  password:string;


}
