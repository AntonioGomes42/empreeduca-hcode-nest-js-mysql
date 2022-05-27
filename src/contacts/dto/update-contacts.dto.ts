import { ApiProperty} from "@nestjs/swagger";
import { UpdatePhonesDto } from "src/phones/dto/update-phones.dto";

export class UpdateContactsDto extends UpdatePhonesDto{
    @ApiProperty()
    email?: string;
}