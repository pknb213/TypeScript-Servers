import {Inject, Injectable} from "@nestjs/common";
import {CONFIG_OPTIONS} from "../common/common.constants";
import {EmailVar, MailModuleOptions} from "./mail.interfaces";
import got from "got";
import * as FormData from "form-data";

@Injectable()
export class MailService {
    constructor(
        @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions
    ) {

    }

    public async sendEmail(subject: string, content: string, emailVars: EmailVar[]) {
        const form = new FormData()
        form.append("from", `Excited User <mailgun@${this.options.domain}>`)
        form.append("to", `youngjo.cheon@balaan.co.kr`)
        form.append("subject", subject)
        form.append("text", content)
        try {
            emailVars.forEach(eVar => form.append(`v:${eVar.key}`, eVar.value))
            await got.post(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
                headers: {
                    "Authorization": `Basic ${Buffer.from(
                        `api:${this.options.apiKey}`
                    ).toString('base64')}`,
                },
                body: form,
            })
            return true
        } catch (error) {
            // console.log(error)
            return false
        }
    }

    sendVerificationEmail(email:string, code:string) {
        this.sendEmail("Verify Your Email", "verify-email", [
            {key: 'code', value: code},
            {key: 'username', value: email}
        ])
    }
}