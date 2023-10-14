import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { CoreEntity } from "../../common/entities/core.entity";
import { IsNumber, IsString, Length } from "class-validator";
import { Restaurant } from "./restaurant.entity";

@InputType('DishInputType', {isAbstract: true})
@ObjectType()
@Entity()
export class Dish extends CoreEntity{
  @Field(is => String)
  @Column({unique: true})
  @IsString()
  @Length(5)
  name: string

  @Field(is => Int)
  @Column()
  @IsNumber()
  price: number

  @Field(is => String)
  @Column()
  @IsString()
  photo: string

  @Field(is => String)
  @Column()
  @Length(5, 140)
  description: string

  @Field(type => Restaurant)
  @ManyToOne(type => Restaurant,
      restaurant => restaurant.menu,
    {onDelete: "CASCADE"}
  )
  restaurant: Restaurant

  @RelationId((dis: Dish) => dis.restaurant)
  restaurantId: number
}