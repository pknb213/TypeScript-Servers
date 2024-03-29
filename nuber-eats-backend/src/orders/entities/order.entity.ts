import { Field, Float, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Column, Entity, ManyToMany, ManyToOne, RelationId } from "typeorm";
import { CoreEntity } from "../../common/entities/core.entity";
import { User } from "../../users/entities/user.entity";
import { Restaurant } from "../../restaurants/entities/restaurant.entity";
import { Dish } from "../../restaurants/entities/dish.entity";
import { JoinTable } from "typeorm";
import { OrderItem } from "./order-item.entity";
import { IsEnum, IsNumber } from "class-validator";

export enum OrderStatus {
  Pending = "Pending",
  Cooking = "Cooking",
  Cooked = "Cooked",
  PickedUp = "PickedUp",
  Delivered = "Delivered"
}

registerEnumType(OrderStatus, {name: "OrderStatus"})

@InputType('OrderInputType', {isAbstract: true})
@ObjectType()
@Entity()
export class Order extends CoreEntity {
  @Field(type => User, {nullable: true})
  @ManyToOne(
    type => User,
    user => user.orders,
    {
      onDelete: 'SET NULL',
      nullable: true,
      eager: true
    } // customer를 지워도 order가 지워지지 않음
  )
  customer?: User

  @RelationId((order: Order) => order.customer)
  customerId: number

  @Field(type => User, {nullable: true})
  @ManyToOne(
    type => User,
    user => user.rides,
    {
      onDelete: 'SET NULL',
      nullable: true,
      eager: true
    }
  )
  driver?: User

  @RelationId((order: Order) => order.driver)
  driverId: number

  @Field(type => Restaurant, {nullable: true})
  @ManyToOne(
    type => Restaurant,
    restaurant=> restaurant.orders,
    {
      onDelete: 'SET NULL',
      nullable: true,
      eager: true
    }
  )
  restaurant?: Restaurant

  @Field(type => [OrderItem])
  @ManyToMany(type => OrderItem, {eager: true})
  @JoinTable()
  items: OrderItem[]

  @Column({nullable: true})
  @Field(type => Float, {nullable: true})
  @IsNumber()
  total?: number

  @Column({type: "enum", enum: OrderStatus, default: OrderStatus.Pending})
  @Field(type => OrderStatus)
  @IsEnum(OrderStatus)
  status: OrderStatus

}