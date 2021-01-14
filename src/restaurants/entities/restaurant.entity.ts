import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional,isString,IsString, Length } from 'class-validator';
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
  @IsString()
  @Length(5)
  name: string;

  @Field(type => Boolean,{nullable:true})
  @Column({default : true})
  @IsOptional()
  @IsBoolean()
  isVegan: boolean;

  @Field(type => String,{defaultValue:"강남"})
  @Column()
  @IsString()
  address: string;
}