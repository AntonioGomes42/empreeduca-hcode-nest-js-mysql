import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataBaseService } from 'src/database/database.service';
import getDataUpdate from 'src/utils/get-data-update';
import isEmptyString from 'src/utils/is-empty-string';
import validateNumberReturn from 'src/utils/validate-number';
import validateIdAndReturnRecord from 'src/utils/validate-return';
import verifyDataObject from 'src/utils/verify-data-object';
import { CreateAdressDto } from './dto/create-adress.dto';
import { UpdateAdressDto } from './dto/update-adress.dto';

@Injectable()
export class AdressesService {
    constructor(private db: DataBaseService) { }
    
    async getAll() {
        return this.db.adresses.findMany({include:{states:true}});
    }

    async getById(id: number) {
        const notFoundMessage: string = "Endereço não encontrado. Informe um índice de endereço válido."
        let adress: any;
        
        adress = await validateIdAndReturnRecord(id, this.db.adresses);
        
        if (!adress) { 
            throw new NotFoundException(notFoundMessage);
        }
        
        return adress;  
    }

    async createAdress({
        city,
        state_id,
        zip_code,
        complement
    }: CreateAdressDto) {
        state_id = validateNumberReturn(state_id, "Insira um índice de estado válido.");
        validateNumberReturn(zip_code, "Informe um CEP válido.");
        isEmptyString(city,"Informe um nome válido de cidade.")
        isEmptyString(complement, "O complemento precisa ser uma referência válida.")

        try {
            const createdAdress = await this.db.adresses.create({
                data: {
                    city,
                    zip_code,
                    complement,
                    states: {
                        connect: {
                            id: state_id
                        }
                    }
                }
            });
            return createdAdress;
        } catch (error) {
            
            return error;
        }
    }

    async updateAdress(adressUpdate: UpdateAdressDto, id: number) {
        const adress = await this.getById(id);
        
        let dataUpdate: UpdateAdressDto = {};
        dataUpdate = getDataUpdate(adressUpdate, dataUpdate);
        let state_id: number;
        if (dataUpdate.state_id) {
            state_id = validateNumberReturn(dataUpdate.state_id, "Insira um índice valido de estado.");
        } else {
            state_id = adress.state_id;
        }

        if (dataUpdate.zip_code){
            await validateNumberReturn(dataUpdate.zip_code, "Informe um CEP válido.");
        }

        if (adressUpdate.complement == "" || (typeof adressUpdate.complement === 'string' && adressUpdate.complement.trim().length === 0) ) {    
            throw new BadRequestException("O complemento precisa ser uma referência válida."); 
        }
        
        try {
            verifyDataObject(dataUpdate);
        } catch (error) {
            throw error;
        }

        try {
            const updatedAdress = await this.db.adresses.update(
                {
                    data: {
                        city: adressUpdate.city,
                        zip_code: adressUpdate.zip_code,
                        states: {
                            connect: {
                                id: state_id
                            }
                        },
                        complement: adressUpdate.complement
                    },
                    where: {
                        id: adress.id
                    }
                }
            );
            return updatedAdress;
        } catch (error) {
            return error;
        }
    }

    async deleteAdress(id: number) {
        id = validateNumberReturn(id, "Informe um id válido.");
        try {
            await this.getById(id);
        } catch (error) {
            throw error;
        }
        try {
            const deletedAdress = await this.db.adresses.delete({
                where: {
                    id
                }
            });
            return deletedAdress;
        } catch (error) {
            throw error;
        }
    }
}
