import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import alreadyExists from 'src/exceptions-db/already-exists.exception';
import cantDelete from 'src/exceptions-db/cant-delete.exception';
import tooBig from 'src/exceptions-db/too-big.exception';
import { ContactsService } from './contacts.service';
import { CreateContactsDto } from './dto/create-contacts.dto';
import { UpdateContactsDto } from './dto/update-contacts.dto';

@UseGuards(AuthGuard)
@Controller('contacts')
export class ContactsController {
    constructor(private contactsService: ContactsService){}

    @Get()
    getAll() { 
        return this.contactsService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: number) { 
        try {
            const contactsFound = await this.contactsService.getById(id);
            return contactsFound;
        } catch (error) {
            throw error;
        } 
    }

    @Post()
    async createContacts(@Body() newContacts: CreateContactsDto) {
        try {
            const createdContacts = await this.contactsService.createContacts(newContacts);  
            if (createdContacts.code) {
                alreadyExists(createdContacts);
                tooBig(createdContacts);
            }
            return createdContacts;
        } catch (error) {
            throw error;
        }
    }

    @Put(':id')
    async updateContacts(
        @Body() contactsUpdate: UpdateContactsDto,
        @Param('id') id: number) {
        try {
            const updateContact =  await this.contactsService.updateContacts(contactsUpdate, id);
            if (updateContact.code) {
                alreadyExists(updateContact);
                tooBig(updateContact);
            }
            return updateContact;
        } catch (error) {
            throw error;
        } 
    }

    @Delete(':id')
    async deleteContacts(@Param('id') id: number) {
        try {
            const deletedContact = await this.contactsService.deleteContacts(id);
            return deletedContact;
        } catch (error) {
            if (error.code) {
                cantDelete(error, "`O contato de índice ${id} não pode ser deletado, pois está sendo usado em uma ou mais tabelas. Sugestão: Altere os registros das tabelas que usam este contato, informando um índice de contato diferente e tente deletar novamente este registro.`");
            }
            throw error;
        }   
    }
}
