import { BadRequestException } from "@nestjs/common";

export default function isEmptyString(value: any, errorMessage:string) {
    if (value == "" || (typeof value === 'string' && value.trim().length === 0) ) {
        throw new BadRequestException(errorMessage); 
    }
}