import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import alreadyExists from "src/exceptions-db/already-exists.exception";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDTO } from "./dto/update-service.dto";
import { ServicesService } from "./services.service";

@UseGuards(AuthGuard)
@Controller('services')
export class ServicesController {
    constructor(private servicesService : ServicesService) {}

    @Get()
    getAll(){ 
        return this.servicesService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: number) { 
        try {
            const serviceFound = await this.servicesService.getById(id);
            return serviceFound;
        } catch (error) {      
            throw error;
        }
    }

    @Post()
    async createService(@Body() newService: CreateServiceDto) {
        try {
            const createdService = await this.servicesService.createService(newService);
            alreadyExists(createdService);
            return createdService;
        } catch (error) {
            alreadyExists(error)
            throw error;
        } 
    }

    @Put(':id')
    async updateService(
        @Body() serviceUpdate: UpdateServiceDTO,
        @Param('id') id: number
    ) { 
        try {
            const updatedService = await this.servicesService.updateService(serviceUpdate, id);
            alreadyExists(updatedService);
            return updatedService
        } catch (error) {
            throw error;
        }  
    }

    @Delete(':id')
    async deleteService(@Param('id') id: number) { 
        try {
            const deletedService = await this.servicesService.deleteService(id);
            return deletedService
        } catch (error) {
            throw error;
        }  
    }
}