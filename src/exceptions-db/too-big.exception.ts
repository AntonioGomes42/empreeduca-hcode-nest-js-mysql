import { BadRequestException } from "@nestjs/common";

export default function tooBig(error: any) {
    if (error.code == "P2000") {
        throw new BadRequestException(`O valor informado no campo ${error.meta.column_name} é muito grande.`);
    }
}