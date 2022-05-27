import { BadRequestException, Body, Injectable, NotFoundException} from '@nestjs/common';
import { AdressesService } from 'src/adresses/adresses.service';
import { CreateAdressDto } from 'src/adresses/dto/create-adress.dto';
import { ContactsService } from 'src/contacts/contacts.service';
import { DataBaseService } from 'src/database/database.service';
import { PhonesService } from 'src/phones/phones.service';
import { StatesService } from 'src/states/states.service';
import getDataUpdate from 'src/utils/get-data-update';
import isEmptyString from 'src/utils/is-empty-string';
import validateNumberReturn from 'src/utils/validate-number';
import validateIdAndReturnRecord from 'src/utils/validate-return';
import verifyDataObject from 'src/utils/verify-data-object';
import { CreateAffiliateDto } from './dto/create-affiliate.dto';
import { UpdateAffiliateDto } from './dto/update-affiliate.dto';

@Injectable()
export class AffiliatesService {
    constructor(private db: DataBaseService, private contactsService: ContactsService, private adressService: AdressesService, private statesService: StatesService, private phonesService: PhonesService){}

    async getAll() {
        return this.db.affiliates.findMany({include:{adresses:true, contacts:true}});
    }

    async getById(id:number) {
        const notFoundMessage: string = "Afiliado não encontrado."
        let affiliate: any;
        
        affiliate = await validateIdAndReturnRecord(id, this.db.affiliates, { include: { adresses: true, contacts: true } });
        
        if (!affiliate) { 
            throw new NotFoundException(notFoundMessage);
        }
        
        return affiliate;
    }

    async createAffiliate({ 
        name,
        email,
        primary_phone_number,
        second_phone_number,
        contacts_id,
        adress_id,
        city,
        complement,
        state_id,
        zip_code
    }: CreateAffiliateDto) {
        if (adress_id || contacts_id) {
            adress_id = validateNumberReturn(adress_id, "Insira um índice de endereço válido.");
            await this.adressService.getById(adress_id);
            contacts_id = validateNumberReturn(contacts_id, "Insira um índice de contatos válido.");
            await this.contactsService.getById(contacts_id);
            try {
                const createdAffiliate = await this.db.affiliates.create({
                    data: {
                        name,
                        adress_id,
                        contacts_id
                    }
                });
                return createdAffiliate;
            } catch (error) {
                return error;
            }  
        }
            
        if (!email) { 
            throw new BadRequestException("Insira um email válido ou informe o índice de um contato já criado.")
        }

        if (!primary_phone_number) { 
            throw new BadRequestException("Insira um número primário válido ou informe o índice de um contato já criado.")
        }
        
        if (!state_id) { 
            throw new BadRequestException("Insira um índice de estado válido ou informe o índice de um endereço já criado.");
        } else {
            state_id = validateNumberReturn(state_id, "Insira um id de estado válido ou informe o índice de um endereço já criado.");
            try {
                await this.statesService.getById(state_id);
            } catch (error) {
                throw error;
            }
        }

        if (complement == "" || (typeof complement === 'string' && complement.trim().length === 0) ) {    
            throw new BadRequestException("Insira um complemento com referência válida, ou informe o índice de um endereço já criado."); 
        }

        if (!city) { 
            throw new BadRequestException("Insira um nome de cidade, este campo não pode ser vazio ou informe o índice de um endereço já criado.")
        }

        if (!zip_code) { 
            throw new BadRequestException("Insira um CEP válido, este campo não pode ser vazio ou informe o índice de um endereço já criado.")
        } else {
            await validateNumberReturn(zip_code, "Informe um CEP válido ou informe o índice de um endereço já criado.");
        }
        try {
            const createdAffiliate = await this.db.affiliates.create(
                {
                    data: {
                        name,
                        adresses: {
                            create: {
                                city,
                                complement,
                                zip_code,
                                states: {
                                    connect: {
                                        id: state_id
                                    }
                                }
                            }
                        },
                        contacts: {
                            create: {
                                email,
                                phones: {
                                    create: {
                                        primary_phone_number,
                                        second_phone_number
                                    }
                                }
                            }
                        }
                    }
                }
            );
            return createdAffiliate;
        } catch (error) {
            return error;
        }
    }

    async updateAffiliate({ 
        name,
        email,
        primary_phone_number,
        second_phone_number,
        city,
        complement,
        state_id,
        zip_code
    }: UpdateAffiliateDto, id: number) {
        const affiliate = await this.getById(id);
        let dataUpdate: UpdateAffiliateDto = {};
        dataUpdate = getDataUpdate({name,email,primary_phone_number,second_phone_number,city,complement,state_id,zip_code}, dataUpdate);
        try {
            verifyDataObject(dataUpdate);
        } catch (error) {
            throw error;
        }

        if (dataUpdate.name) { 
            isEmptyString(dataUpdate.name,"Informe um nome válido.");
        }

        if (dataUpdate.email) {
            isEmptyString(dataUpdate.email, "Insira um email válido.");
        }

        if (dataUpdate.primary_phone_number) { 
            validateNumberReturn(dataUpdate.primary_phone_number,"Insira o primeiro número como um número válido.")
        }
        let state: any;
        if (dataUpdate.state_id) { 
            state_id = validateNumberReturn(dataUpdate.state_id, "Insira um id de estado válido.");
            try {
                state = await this.statesService.getById(dataUpdate.state_id);
            } catch (error) {
                throw error;
            }
        } else {
            state = {
                id : affiliate.adresses.state_id
            }
        }

        if (dataUpdate.complement == "" || (typeof dataUpdate.complement === 'string' && dataUpdate.complement?.trim().length === 0) ) {    
            throw new BadRequestException("Insira um complemento com referência válida."); 
        }

        if (dataUpdate.city) { 
            isEmptyString(dataUpdate.city,"Insira um nome de cidade válida.")
        }

        if (dataUpdate.zip_code) {
            validateNumberReturn(dataUpdate.zip_code, "Informe um CEP válido.");
        }

        try {
            const updatedAffiliate = await this.db.affiliates.update({
                data: {
                    name: dataUpdate.name,
                    adresses: {
                        update: {
                            city: dataUpdate.city,
                            complement: dataUpdate.complement,
                            zip_code: dataUpdate.zip_code,
                            states: {
                                connect: {
                                    id: state.id
                                }
                            }
                        }
                    },
                    contacts: {
                        update: {
                            email: dataUpdate.email,
                            phones: {
                                update: {
                                    primary_phone_number: dataUpdate.primary_phone_number,
                                    second_phone_number: dataUpdate.second_phone_number
                                }
                            }
                        }
                    }
                },
                where: {
                    id: affiliate.id
                }
            }
            );
            return updatedAffiliate;
        } catch (error) {
            return error;
        }
    }

    async deleteAffiliate(id: number) {
        id = validateNumberReturn(id, "Informe um id válido.");
        try {
            await this.getById(id);
        } catch (error) {
            throw error;
        }
        try {
            const deletedAffiliate = await this.db.affiliates.delete({
                where: {
                    id
                }
            });
            return deletedAffiliate;
        } catch (error) {
            throw error;
        }
    }   
}


