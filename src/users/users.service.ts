import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createAccountInput } from "./dtos/create-account.dto";
import { LoginInput } from "./dtos/login.dto";
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
    }: createAccountInput): Promise<{ok:boolean ,error?:string}> {

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

    async login({
        email,
        password,
    }:LoginInput): Promise<{ok:boolean ,error?:string,token?:string}> {
        //2.check if the password is correct
        //3.make a JWT and give it to the user
        try{
            const user = await this.users.findOne({email});
            if(!user){  //유저를 찾지 못할 경우
                return{
                    ok:false,
                    error:'User not found',
                };
            }
            const passwordCorrect = await user.checkPassword(password);
            if(!passwordCorrect){
                return{
                    ok:false,
                    error:'Wrong password',
                };
            }
            return{
                ok:true,
                token: 'lalalalaalala',
            };
        }catch(error){
            return{
                ok:false,
                error,
            };
        }
        
    }
}