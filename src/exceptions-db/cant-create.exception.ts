import { BadRequestException } from "@nestjs/common";

export default function cantCreate(error: any, message: string) {
    if (error.code == "P2025") {
        throw new BadRequestException(message); 
    }
}