import { BadRequestException } from "@nestjs/common";

export default function verifyDataObject(
    data: {},
    message: string = "Informe pelo menos um valor para ser atualizado."
) { 
    if (Object.entries(data).length === 0) { 
        throw new BadRequestException(message);
    }
}