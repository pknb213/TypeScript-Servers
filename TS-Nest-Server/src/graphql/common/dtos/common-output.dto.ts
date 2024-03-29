import {Field, ObjectType} from "@nestjs/graphql";
import {Any} from "typeorm";

@ObjectType()
export class CommonOutput {
    @Field(type => Boolean)
    ok: boolean
    @Field(type => String, {nullable: true})
    error?: string
    @Field(type => Any)
    data?: any
}