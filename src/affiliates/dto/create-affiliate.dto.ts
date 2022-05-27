import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { UpdateContactsDto } from "src/contacts/dto/update-contacts.dto";

export class CreateAffiliateDto extends PartialType(UpdateContactsDto){
    @IsNotEmpty({
        message: 'O email não pode ser vazio.',
    })
    @MaxLength(255, {
        message : "O nome deve conter no máximo 255 caracteres."
    })
    @MinLength(1, {
        message : "O nome deve conter pelo menos 1 caracter."
    })
    @ApiProperty()
    name: string;

    @ApiProperty()
    adress_id?: number;

    @ApiProperty()
    contacts_id?: number;

    @ApiProperty()
    city?: string;

    @ApiProperty()
    zip_code?: string;

    @ApiProperty()
    complement?: string;

    @ApiProperty()
    state_id?: number;
}