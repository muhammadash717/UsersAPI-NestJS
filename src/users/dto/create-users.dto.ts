import { IsEnum, MinLength } from "class-validator";

export class CreateUserDto {
    @MinLength(3)
    name: string;

    @IsEnum(['admin', 'mid'], {message: 'Use correct levels..!'})
    level: string;
}
