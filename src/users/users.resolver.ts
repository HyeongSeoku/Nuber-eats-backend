import { Resolver,Query } from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";


@Resolver(of => User)        //of자리는 비어있어도됨 (function 이기만 하면됨)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(retruns => Boolean)
    hi(){
        return true;
    }
}