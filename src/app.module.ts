import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsModule } from './restaurants/restaurants.module';
import {Restaurant} from './restaurants/entities/restaurant.entity';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { User } from './users/entities/user.entity';

console.log(Joi);

@Module({
  imports:
    [ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV ==='dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile:process.env.NODE_ENV === 'prod',
      validationSchema:Joi.object({
        NODE_ENV:Joi.string().
        valid('dev','prod'),  //환경변수 유효성 검사  
      }),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }), TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite" ,
      synchronize: process.env.NODE_ENV !=='prod',
      logging: process.env.NODE_ENV !== 'prod',
      entities: [Restaurant,User],
      
    }), RestaurantsModule, UsersModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
