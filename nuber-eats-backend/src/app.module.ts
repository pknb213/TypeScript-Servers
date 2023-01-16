import { Module } from '@nestjs/common';
import {GraphQLModule} from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {TypeOrmModule} from "@nestjs/typeorm";
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [
      GraphQLModule.forRoot({
          driver: ApolloDriver,
          autoSchemaFile: true,
      }),
      TypeOrmModule.forRoot({
          type: 'postgres',
          host: '127.0.0.1',
          port: 5432,
          username: 'developer',
          password: 'devpassword',
          database: 'nuber-eats',
          synchronize: true,
          logging: true,
      }),
      RestaurantModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}