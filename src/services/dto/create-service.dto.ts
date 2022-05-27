import { ApiProperty } from "@nestjs/swagger";
import {IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateServiceDto {

    @MinLength(1, {
        message : "o nome precisa deve conter pelo menos 1 caracter."
    })
    @MaxLength(255, {
        message : "o nome precisa deve conter no máximo 255 caracteres."
    })
    @IsNotEmpty({
        message: 'O nome do serviço não pode ser vazio.',
    })
    @ApiProperty()
    name: string;

    @MinLength(1, {
        message : "A descrição do serviço deve conter pelo menos 1 caracter."
    })
    @MaxLength(255, {
        message : "A descrição do serviço deve conter no máximo 255 caracteres."
    })
    @IsNotEmpty({
        message: 'A descrição do serviço não pode ser vazio.',
    })
    @ApiProperty()
    description: string;
}