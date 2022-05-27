import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataBaseService } from 'src/database/database.service';
import validateIdAndReturnRecord from 'src/utils/validate-return';
import verifyDataObject from 'src/utils/verify-data-object';
import { CreatePhonesDto } from './dto/create-phones.dto';
import { UpdatePhonesDto } from './dto/update-phones.dto';


@Injectable()
export class PhonesService {
    constructor(private db: DataBaseService) {}
    
    async getAll() {
        return this.db.phones.findMany();
    }

    async getById(id: number) {
        const notFoundMessage: string = "Contatos não encontrados"
        let phones: any;
        
        phones = await validateIdAndReturnRecord(id, this.db.phones);
        
        if (!phones) { 
            throw new NotFoundException(notFoundMessage);
        }
        
        return phones;  
    }

    async createPhones(newPhones: CreatePhonesDto) {
        if (newPhones.second_phone_number) { 
            if (newPhones.primary_phone_number.replace(/ /g, "") === newPhones.second_phone_number.replace(/ /g, "")) { 
                throw new BadRequestException("Os números de Telefones não podem ser repetidos.")
            }
        }
        try {
            const createdPhone = await this.db.phones.create({
                data : newPhones
            })
            return createdPhone;
        } catch (error) {
            throw error;
        }
        
    }

    async updatePhones(phonesUpdate: UpdatePhonesDto, id: number) {
        const phones = await this.getById(id);

        const dataUpdate: UpdatePhonesDto = {};

        if (phonesUpdate.primary_phone_number) { 
            dataUpdate.primary_phone_number = phonesUpdate.primary_phone_number;
        }

        if (phonesUpdate.second_phone_number) { 
            dataUpdate.second_phone_number = phonesUpdate.second_phone_number;
        }
        
        try {
            verifyDataObject(dataUpdate);
        } catch (error) {
            if (error.message) {
                return error.message
            }
            return error;
        }
        
        return this.db.phones.update({
            data: dataUpdate,
            where: {
                id: phones.id
            }
        })
        
    }

    async deletePhones(id: number) {
        try {
            await this.getById(id);
        } catch (error) {
            if (error.message) {
                return error.message
            }
            return error;
        }
        id = Number(id);
        return this.db.phones.delete({
            where: {
                id
            }
        });
    }
}
