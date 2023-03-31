import { BaseException } from "@application/exceptions";

export interface Validation{
    validate(input: any): Promise<BaseException>
}