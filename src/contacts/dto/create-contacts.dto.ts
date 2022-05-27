import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, MinLength, IsNotEmpty, IsEmail} from "class-validator";
import { CreatePhonesDto } from "src/phones/dto/create-phones.dto";

export class CreateContactsDto extends CreatePhonesDto{
    @IsNotEmpty({
        message: 'O email não pode ser vazio.',
    })
    @MaxLength(254, {
        message : "O email deve conter no máximo 254 caracteres."
    })
    @IsEmail({}, {
        message : "O email deve ser um email válido."
    })
    @ApiProperty()
    email: string;
}