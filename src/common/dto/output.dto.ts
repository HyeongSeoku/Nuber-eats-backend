import { Field, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsString } from "class-validator";

@ObjectType()
export class MutationOutput {
    @Field(type => String, { nullable: true })
    error?: string;

    @Field(type => Boolean)
    ok: boolean;
}