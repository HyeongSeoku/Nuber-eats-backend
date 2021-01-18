import { Type } from "@nestjs/common";
import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity } from "typeorm";

export enum UserRole{
    Client,
    Owner,
    Delivery,
}

registerEnumType(UserRole,{name:'UserRole'});

@InputType({isAbstract:true})
@ObjectType()
@Entity()
export class User extends CoreEntity {

    @Column()
    @Field(type =>String)
    email: string;

    @Column()
    @Field(type =>String)
    password: string;

    @Column({type:'simple-enum',enum:UserRole})
    @Field(type =>UserRole)
    role: UserRole;
}