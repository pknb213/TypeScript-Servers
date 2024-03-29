import {BeforeInsert, BeforeUpdate, Column, Entity, OneToMany} from "typeorm";
import {CoreEntity} from "../../common/entities/core.entity";
import {Field, InputType, ObjectType, registerEnumType} from "@nestjs/graphql";
import * as bcrypt from "bcrypt"
import {InternalServerErrorException} from "@nestjs/common";
import {IsEmail, IsEnum} from "class-validator";
import {Restaurant} from "../../restaurants/entities/restaurant.entity";
import { Order } from "../../orders/entities/order.entity";
import { Payment } from "../../payments/entities/payment.entity";
export enum UserRole {
    Client = 'Client',
    Owner = 'Owner',
    Delivery = 'Delivery',
}

registerEnumType(UserRole, {name: 'UserRole'})

@InputType('UserInputType', {isAbstract: true})
@ObjectType()
@Entity()
export class User extends CoreEntity{
    @Column()
    @Field(type=> String)
    @IsEmail()
    email: string

    @Column({select: false})
    @Field(type=> String)
    password: string

    @Column({type: 'enum', enum: UserRole})
    @Field(type=> UserRole)
    @IsEnum(UserRole)
    role: UserRole

    @Column({default: false})
    @Field(type=>Boolean)
    verified: boolean

    @Field(type => [Restaurant])
    @OneToMany(
      type => Restaurant,
        restaurant => restaurant.owner
    )
    restaurants: Restaurant[]

    @Field(type => [Order])
    @OneToMany(
      type => Order,
        order => order.customer
    )
    orders: Order[]

    @Field(type => [Payment])
    @OneToMany(
      type => Payment,
        payment => payment.user
    )
    payments: Payment[]

    @Field(type => [Order])
    @OneToMany(
      type => Order,
        order => order.driver
    )
    rides: Order[]

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        if (this.password) {
            try {
                this.password = await bcrypt.hash(this.password, 10)
            } catch (error) {
                console.log(error)
                throw new InternalServerErrorException()
            }
        }
    }
    async checkPassword(aPassword: string): Promise<boolean> {
        try {
            const ok = await bcrypt.compare(aPassword, this.password)
            return ok
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException()
        }
    }
}