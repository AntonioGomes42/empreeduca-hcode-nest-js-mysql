import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import alreadyExists from 'src/exceptions-db/already-exists.exception';
import cantCreate from 'src/exceptions-db/cant-create.exception';
import cantDelete from 'src/exceptions-db/cant-delete.exception';
import tooBig from 'src/exceptions-db/too-big.exception';
import { AdressesService } from './adresses.service';
import { CreateAdressDto } from './dto/create-adress.dto';
import { UpdateAdressDto } from './dto/update-adress.dto';

@UseGuards(AuthGuard)
@Controller('adresses')
export class AdressesController {
    constructor(private adressesService: AdressesService) { }
    
    @Get()
    getAll() { 
        return this.adressesService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: number) { 
        try {
            const adressFound = await this.adressesService.getById(id);
            return adressFound;
        } catch (error) {
            throw error;
        } 
    }

    @Post()
    async createAdress(@Body() newAdress: CreateAdressDto) {
        try {
            const createdAdress = await this.adressesService.createAdress(newAdress);
            if (createdAdress.code) {
                alreadyExists(createdAdress);
                tooBig(createdAdress);
            }
            return createdAdress;
        } catch (error) {
            if (error.code) {
                cantCreate(error, "Não foi possível criar este endereço, verifique se o índices informado de estado corresponde a um registro existente no banco de dados.");
            }
            throw error;
        }
    }

    @Put(':id')
    async updateAdress(
        @Body() adressUpdate: UpdateAdressDto,
        @Param('id') id: number) {
        try {
            const updatedAdress = await this.adressesService.updateAdress(adressUpdate, id);
            if (updatedAdress.code) {
                alreadyExists(updatedAdress);
                tooBig(updatedAdress);
            }
            return updatedAdress;
        } catch (error) {
            throw error;
        } 
    }

    @Delete(':id') 
    async deleteAdress(@Param('id') id: number){
        try {
            const deletedAdress = await this.adressesService.deleteAdress(id);
            return deletedAdress;
        } catch (error) {
            if (error.code) {
                cantDelete(error, `O endereço de índice ${id} não pode ser deletado, pois está sendo usado em uma ou mais tabela. Sugestão: Altere os registros das tabelas que usam este endereço, informando um índice de endereço diferente e tente deletar novamente este registro.`)
            }
            throw error;
        }
    }
}
