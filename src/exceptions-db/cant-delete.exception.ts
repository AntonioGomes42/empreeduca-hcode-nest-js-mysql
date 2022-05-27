import { BadRequestException } from "@nestjs/common";

export default function cantDelete(error: any, message: string) {
    if (error.code == "P2003") {
        throw new BadRequestException(message)  
    }
}