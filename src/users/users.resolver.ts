import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { createAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";


@Resolver(of => User)        //of자리는 비어있어도됨 (function 이기만 하면됨)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) { }

    @Query(retruns => Boolean)
    hi() {
        return true;
    }

    @Mutation(returns => CreateAccountOutput)
    async createAccount(
        @Args('input') createAccountInput: createAccountInput,
    ): Promise<CreateAccountOutput> {
        try {
            return this.usersService.createAccount(createAccountInput,);
            
        } catch (error) {
            return {
                error,
                ok: false,
            };
        }
    }

    @Mutation(returns => LoginOutput)
    async login(@Args('input') loginInput: LoginInput) {
        try {
            return this.usersService.login(loginInput);
           
        } catch (error) {
            return {
                ok: false,
                error,
            };
        }
    }

}