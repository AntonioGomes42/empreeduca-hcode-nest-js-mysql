import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";

export class LoginDto{
    @IsNotEmpty({
        message: 'Informe o email.',
    })
    @IsEmail({}, {
        message: "Informe um email válido."
    })
    email: string;

    @IsNotEmpty({
        message: 'Informe a senha.',
    })
    @MinLength(8, {
        message: 'A senha deve ter no mínimo 8 caracteres.',
    })
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%])/, {
        message: 'A senha deve ter pelo menos uma letra minúscula, uma letra maiúscula, um número e um caracter especial.',
    })
    password: string;
}