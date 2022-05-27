import { BadRequestException } from "@nestjs/common";

export default function alreadyExists(error: any) {
    if (error.code == "P2002") {
        throw new BadRequestException(`Já há um registro para o valor informado no campo ${error.meta.target}.`);
    }
}