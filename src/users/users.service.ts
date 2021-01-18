import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createAccountInput } from "./dtos/create-account.dto";
import { User } from "./entities/user.entity";



@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
    ) { }

    async createAccount({
        email,
        password,
        role
    }: createAccountInput): Promise<{ok:boolean; error?:string}> {

        try {
            const exists = await this.users.findOne({ email });   //이메일 존재 여부 확인

            if (exists) {   //이메일 존재 할경우
                return {ok:false,error:'There is a user with that email already'};
            }
            await this.users.save(this.users.create({ email, password, role })) //save 와 create는 다름
            return {ok:true};
        } catch (e) {
            return {ok:false,error:"Couldn't creatae account"};
        }
    } 
}