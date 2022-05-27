import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreatePhonesDto {
    @IsNotEmpty({
        message: 'O número primário não pode ser vazio.',
    })
    @MinLength(10, {
        message : "o número deve conter pelo menos 10 dígitos incluindo o DDD."
    })
    @MaxLength(14, {
        message : "o número deve conter no máximo 14 dígitos incluindo o DDD e o Código do País."
    })
    @ApiProperty()
    primary_phone_number: string;
    
    @ApiProperty()
    second_phone_number?: string;
}