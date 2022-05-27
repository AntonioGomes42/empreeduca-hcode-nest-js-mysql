import { PartialType } from "@nestjs/swagger";
import { CreatePhonesDto } from "./create-phones.dto";

export class UpdatePhonesDto extends PartialType(CreatePhonesDto){}