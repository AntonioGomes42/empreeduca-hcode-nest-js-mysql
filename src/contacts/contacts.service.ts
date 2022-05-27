import { Injectable, NotFoundException } from '@nestjs/common';
import { DataBaseService } from 'src/database/database.service';
import { PhonesService } from 'src/phones/phones.service';
import getDataUpdate from 'src/utils/get-data-update';
import isEmptyString from 'src/utils/is-empty-string';
import validateNumberReturn from 'src/utils/validate-number';
import validateIdAndReturnRecord from 'src/utils/validate-return';
import verifyDataObject from 'src/utils/verify-data-object';
import { CreateContactsDto } from './dto/create-contacts.dto';
import { UpdateContactsDto } from './dto/update-contacts.dto';

@Injectable()
export class ContactsService {
    constructor(private db: DataBaseService, private phonesService: PhonesService) { }

    async getAll() {
        return this.db.contacts.findMany({ include:{
            phones: true
        }});
    }

    async getById(id: number) {
        const notFoundMessage: string = "Contatos não encontrados."
        let contacts: any;
        
        contacts = await validateIdAndReturnRecord(id, this.db.contacts, { include:{phones: true}} );
        
        if (!contacts) { 
            throw new NotFoundException(notFoundMessage);
        }
        
        return contacts;  
    }

    async createContacts({
        email,
        primary_phone_number,
        second_phone_number }: CreateContactsDto) {
        let phones: any;

        if (primary_phone_number) {
            const errorMessagePrimaryPhone = "Informe o primeiro telefone como um número válido."
            isEmptyString(primary_phone_number, errorMessagePrimaryPhone);
            validateNumberReturn(primary_phone_number, errorMessagePrimaryPhone);
        }

        if (second_phone_number) {
            const errorMessagePrimaryPhone = "Informe o segundo telefone como um número válido."
            isEmptyString(second_phone_number, errorMessagePrimaryPhone);
            validateNumberReturn(second_phone_number, errorMessagePrimaryPhone);
        }
        try {
            phones = await this.phonesService.createPhones({ primary_phone_number, second_phone_number });
        } catch (error) {
            return error;
        }    
        try {
            const createdContact = await this.db.contacts.create({
                data: {
                    email,
                    phones: {
                        connect: {
                            id: phones.id
                        }
                    }
                }
            });
            return createdContact;
        } catch (error) {
            await this.phonesService.deletePhones(phones.id);
            return error;
        }
    }

    async updateContacts(contactsUpdate: UpdateContactsDto, id: number) { 
        const contacts = await this.getById(id);

        let dataUpdate: UpdateContactsDto = {};
        dataUpdate = getDataUpdate(contactsUpdate, dataUpdate)
        
        try {
            verifyDataObject(dataUpdate);
        } catch (error) {
            throw error;
        }

        if (dataUpdate.email) {
            isEmptyString(dataUpdate.email, "Informe um endereço de email válido.");
        }

        if (dataUpdate.primary_phone_number) {
            const errorMessagePrimaryPhone = "Informe o primeiro telefone como um número válido."
            isEmptyString(dataUpdate.primary_phone_number, errorMessagePrimaryPhone);
            validateNumberReturn(dataUpdate.primary_phone_number, errorMessagePrimaryPhone);
        }

        if (dataUpdate.second_phone_number) {
            const errorMessagePrimaryPhone = "Informe o segundo telefone como um número válido."
            isEmptyString(dataUpdate.second_phone_number, errorMessagePrimaryPhone);
            validateNumberReturn(dataUpdate.second_phone_number, errorMessagePrimaryPhone);
        }
        
        try {
            const updatedContact = await this.db.contacts.update({
                data: {
                    email: dataUpdate.email,
                    phones: {
                        update: {
                            primary_phone_number: dataUpdate.primary_phone_number,
                            second_phone_number: dataUpdate.second_phone_number
                        }
                    }
                },
                where: {
                    id: contacts.id
                }
            });
            return updatedContact;
        } catch (error) {
            return error;
        }
    }

    async deleteContacts(id: number) {
        id = validateNumberReturn(id, "Informe um id válido.");
        try {
            await this.getById(id);
        } catch (error) {
            throw error;
        }
        try {
            const deletedContact = await this.db.contacts.delete({
                where: {
                    id
                }
            });
            return deletedContact;
        } catch (error) {
            throw error;
        }
    } 
}
