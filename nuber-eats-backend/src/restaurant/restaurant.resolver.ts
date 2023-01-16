import {Args, Field, Mutation, Query, Resolver} from "@nestjs/graphql";
import { Restaurant } from "./entities/restaurant.entity";
import {CreateRestaurantDto} from "./dtos/create-restaurant.dto";
@Resolver(of => Restaurant)
export class RestaurantResolver {
    @Query(() => Restaurant)
    restaurant(@Args('veganOnly') veganOnly: boolean): Restaurant[] {
        return []
    }
    @Mutation(returns => Boolean)
    createRestaurant(
        @Args() createRestaurantDto: CreateRestaurantDto
    ): boolean {
        console.log(createRestaurantDto)
        return true
    }
}