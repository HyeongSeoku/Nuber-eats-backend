import { Field, ObjectType } from "@nestjs/graphql";



@ObjectType()
export class Restaurant{
    @Field(type => String ) //is => string 도 가능 , ()=>string 도 가능
    name : string;
    @Field(type => Boolean, {nullable:true})
    isGood?: boolean;
}