import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPostalCode, MaxLength, MinLength } from "class-validator";

export class CreateAdressDto{
    @IsNotEmpty({
        message: 'O nome da cidade não pode ser vazio.',
    })
    @MaxLength(255, {
        message : 'O nome da cidade deve conter no máximo 255 caracteres.'
    })
    @MinLength(1, {
        message : 'O nome da cidade deve conter pelo menos 1 caracter.'
    })
    @ApiProperty()
    city: string;

    @IsNotEmpty({
        message: 'O CEP não pode ser vazio.',
    })
    @MaxLength(8, {
        message : 'Insira os 8 dígitos do cep corretamente.'
    })
    @MinLength(8, {
        message : 'Insira os 8 dígitos do cep corretamente.'
    })
    @ApiProperty()
    zip_code: string;

    @ApiProperty()
    complement?: string;

    @IsNotEmpty({message:"O índice de estado não pode ser vazio."})
    @ApiProperty()
    state_id: number;
}