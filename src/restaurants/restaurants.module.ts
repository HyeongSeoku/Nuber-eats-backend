import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restauarnts.service';
import { RestaurantResolver } from './restuarants.resolver';

@Module({
    imports:[TypeOrmModule.forFeature([Restaurant])],       //forFeature = 특정 feature를 import 하게 해줌
    providers:[RestaurantResolver,RestaurantService],
})
export class RestaurantsModule {}
