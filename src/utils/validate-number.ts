import { BadRequestException } from "@nestjs/common";
import isNonNegativeAndZero from "./verify-non-negative-zero";

export default function validateNumberReturn(value: any, errorMessage: string) {
    if (isNaN(value)) {
        throw new BadRequestException(errorMessage);
    }
    value = Number(value);
    if (isNonNegativeAndZero(value)) {
        return value;
    }
    throw new BadRequestException(errorMessage);
}