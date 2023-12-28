import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Payment } from "./entities/payment.entity";
import { PaymentsService } from "./payments.service";
import { CreatePaymentInput, CreatePaymentOutput } from "./dtos/create-payment.dto";
import { Role } from "../auth/role.decorator";
import { AuthUser } from "../auth/auth-user.decorator";
import { User } from "../users/entities/user.entity";

@Resolver(of => Payment)
export class PaymentsResolver {
  constructor(
    private readonly paymentService: PaymentsService
  ) {
  }

  @Mutation(returns => CreatePaymentOutput)
  @Role(["Owner"])
  createPayment(
    @AuthUser() owner: User,
    @Args("input") createPaymentInput: CreatePaymentInput): Promise<CreatePaymentOutput> {
    return this.paymentService.createPayment(owner, createPaymentInput);
  }
}
