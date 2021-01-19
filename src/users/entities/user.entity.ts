import { InternalServerErrorException, Type } from "@nestjs/common";
import { 
    Field, 
    InputType, 
    ObjectType, 
    registerEnumType 
} from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, Column, Entity } from "typeorm";
import * as bcrypt from "bcrypt";
import { IsEmail, IsEnum, IsString } from "class-validator";

export enum UserRole {
    Client,
    Owner,
    Delivery,
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {

    @Column()
    @Field(type => String)
    @IsEmail()
    email: string;

    @Column()
    @Field(type => String)
    password: string;

    @Column({ type: 'simple-enum', enum: UserRole })
    @IsEnum(UserRole)
    @Field(type => UserRole)
    role: UserRole;

    @BeforeInsert() //entity가 insert되기 전에 실행됨
    async hashPassword(): Promise<void> {  //입력받은 password를 hash해주는 function
        try{
            this.password = await bcrypt.hash(this.password, 10) //bcrypt.hash(data,saltOrRounds) (saltOrRounds= 반복횟수 default : 10)
        }catch(e){
            console.log(e);
            throw new InternalServerErrorException();       //여기서 보낸 오류는 user.service.ts 의 "await this.users.save(this.users.create({ email, password, role }))" 에서 catch
        }
    }

    async checkPassword(aPassword:string): Promise<boolean>{
        try{
            const ok = bcrypt.compare(aPassword,this.password); //compare(유저가 입력한 password, DB저장된(hash된password))
            return ok;
        }catch(e){
            console.log(e);
            throw new InternalServerErrorException();
        }
    }
}