import { ApiProperty, PartialType } from "@nestjs/swagger";
import { UpdateContactsDto } from "src/contacts/dto/update-contacts.dto";


export class UpdateAffiliateDto extends PartialType(UpdateContactsDto) {
    @ApiProperty()
    name?: string;

    @ApiProperty()
    city?: string;

    @ApiProperty()
    zip_code?: string;

    @ApiProperty()
    complement?: string;

    @ApiProperty()
    state_id?: number;
}