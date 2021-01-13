import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@InputType({isAbstract:true})   //직접 쓰는것이 아닌 어떤것으로 확장시킨다는 의미 ,(InputType과 ObjectType을 둘다 한번에 사용할수 없어서)
@ObjectType()
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field(type => Number)
  id: number;

  @Field(type => String)
  @Column()
  name: string;

  @Field(type => Boolean)
  @Column()
  isVegan: boolean;

  @Field(type => String)
  @Column()
  address: string;

  @Field(type => String)
  @Column()
  ownersName: string;

  @Field(type => String)
  @Column()
  categoryName: string;
}