import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { Order, OrderStatus } from "../entities/order.entity";
import { CoreOutput } from "../../common/dtos/output.dto";

@InputType()
export class EditOrderInput extends PickType(Order, ['id', 'status']) {}

@ObjectType()
export class EditOrderOutput extends CoreOutput {}