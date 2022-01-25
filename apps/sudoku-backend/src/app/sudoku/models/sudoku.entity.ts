import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SudokuFieldEntity } from "./sudoku-field.entity";
import { UserEntity } from "../../auth/models/user.entity";


@Entity()
export class SudokuEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  difficulty?: string;

  @Column()
  edit_time: number;

  @Column({ default: "classic" })
  type: string;

  @OneToMany(type => SudokuFieldEntity, sudokufield => sudokufield.sudoku)
  fields?: SudokuFieldEntity[];

  @ManyToOne(type => UserEntity)
  user?: UserEntity;


}
