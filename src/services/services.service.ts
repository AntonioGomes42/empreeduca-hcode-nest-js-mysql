import { Injectable, NotFoundException } from "@nestjs/common";
import { DataBaseService } from "src/database/database.service";
import { UpdateServiceDTO } from "./dto/update-service.dto";
import { CreateServiceDto } from "./dto/create-service.dto";
import verifyDataObject from "src/utils/verify-data-object";
import validateIdAndReturnService from "src/utils/validate-return";
import isEmptyString from "src/utils/is-empty-string";

@Injectable({})
export class ServicesService {
    constructor(private db: DataBaseService){}

    async getAll() { 
        return this.db.services.findMany();
    }

    async getById(id: number) {
        const notFoundMessage: string = "Serviço não encontrado"
        let service: any;
        
        service = await validateIdAndReturnService(id, this.db.services);
        
        if (!service) { 
            throw new NotFoundException(notFoundMessage);
        }
        
        return service;   
    }

    async createService({name, description}: CreateServiceDto) {
        isEmptyString(name, "Informe um nome válido.");
        isEmptyString(description, "Infome uma descrição válida.")
        try {
            const createdService = await this.db.services.create({
                data: {
                    name,
                    description
            } });
            return createdService;
        } catch (error) {
            return error;
        }
    }

    async updateService(serviceUpdate: UpdateServiceDTO, id: number) { 
        const service = await this.getById(id);

        const dataUpdate: UpdateServiceDTO = {};

        if (serviceUpdate.name) {
            isEmptyString(serviceUpdate.name, "Informe um nome válido.");
            dataUpdate.name = serviceUpdate.name;
        }

        if (serviceUpdate.description) { 
            isEmptyString(serviceUpdate.description,"Infome uma descrição válida.")
            dataUpdate.description = serviceUpdate.description;
        }
        
        try {
            verifyDataObject(dataUpdate);
        } catch (error) {
            throw error;
        }
        
        try {
            const updatedService = await this.db.services.update({
                data: dataUpdate,
                where: {
                    id: service.id
                }
            });
            return updatedService
        } catch (error) {
            return error;
        }
    }

    async deleteService(id: number) {
        try {
            await this.getById(id);
        } catch (error) {
            throw error;
        }
        id = Number(id);
        return this.db.services.delete({
            where: {
                id
            }
        });
     }
}