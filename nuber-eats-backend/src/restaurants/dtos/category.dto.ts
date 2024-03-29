import {Field, InputType, ObjectType} from "@nestjs/graphql";
import {Category} from "../entities/category.entity";
import {CoreOutput} from "../../common/dtos/output.dto";
import {PaginationInput, PaginationOutput} from "../../common/dtos/pagenation.dto";

@InputType()
export class CategoryInput extends PaginationInput{
    @Field(type => String)
    slug: string
}

@ObjectType()
export class CategoryOutput extends PaginationOutput {
    @Field(type => Category, {nullable: true})
    category?: Category
}
