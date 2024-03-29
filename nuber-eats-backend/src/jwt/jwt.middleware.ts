import {Injectable, NestMiddleware} from "@nestjs/common";
import {NextFunction, Response} from "express";
import {JwtService} from "./jwt.service";
import {UsersService} from "../users/user.service";
import {assertWrappingType} from "graphql/type";

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        if ("x-jwt" in req.headers) {
            const token = req.headers['x-jwt']
            try {
                const decoded = this.jwtService.verify(token.toString())
                if (typeof decoded === "object" && decoded.hasOwnProperty('id')) {
                    const { user, ok } = await this.usersService.findById(decoded['id'])
                    if(ok) req['user'] = user
                    // console.log(user)
                }

            } catch (e) {
            }
        }
        next()
    }
}