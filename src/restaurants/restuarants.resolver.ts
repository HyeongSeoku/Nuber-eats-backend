import { Query, Resolver } from "@nestjs/graphql";



@Resolver()
export class RestaurantResolver {

    @Query(returns => Boolean) //Graphql을 위한 부분(필수)
    isPizzaGood(): Boolean { //Typescript 를 위한 부분(필수 x)
        return true;
    }
}