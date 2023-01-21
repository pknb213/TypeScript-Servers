import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import { User } from "./entities/user.entity";
import {Injectable} from "@nestjs/common";
import {CreateAccountInput} from "./dtos/create-account.dto";
import {LoginInput} from "./dtos/login.dto";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User)
        private readonly users: Repository<User>) {

        }
    async createAccount(
        {email, password, role}: CreateAccountInput
    ): Promise<{ok:boolean, error?:string}> {
        // chek new user
        // create user & hash the passwrd
        try {
            const exists = await this.users.findOne({where: {email}})
            if (exists) {
                return {ok:false, error:"There is User with that email already"}
            }
            await this.users.save(this.users.create({email, password, role}))
            return {ok:true}
        } catch (e) {
            return {ok:false, error:"Couldn't create account"}
        }
    }
    async login({email, password}: LoginInput): Promise<{ok:boolean, error?:string, token?: string}> {
        // find the user with email
        // check if the passwrod
        // make jwt
        try {
            const user = await this.users.findOne({where: {email}})
            if (!user) {
                return {
                    ok: false,
                    error: 'User not Found'
                }
            }
            const passwordCorrect = await user.checkPassword(password)
            if (!passwordCorrect) {
                return {
                    ok: false,
                    error: 'Wrong Password'
                }
            }
            return {
                ok: true,
                token: "asdsad"
            }
        } catch (error) {
            return {
                ok: false,
                error
            }
        }
    }
}