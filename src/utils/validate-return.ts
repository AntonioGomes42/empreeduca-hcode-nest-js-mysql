import { BadRequestException, NotFoundException } from "@nestjs/common";
import validateNumberReturn from "./validate-number";
import isNonNegativeOrZero from "./verify-non-negative-zero";

export default async function validateIdAndReturnRecord(
    id: any,
    dbTable: any,
    includer: any = false) { 
    const invalidIdMessage = "Insira um id válido.";
    id = validateNumberReturn(id, invalidIdMessage);
    if (includer) {
        return dbTable.findUnique({
            where: {
                id,
            },
            include : includer.include
        });
    }
    return dbTable.findUnique({
        where: {
            id,
        }
    });
}
    
