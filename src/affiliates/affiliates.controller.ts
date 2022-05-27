import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import alreadyExists from 'src/exceptions-db/already-exists.exception';
import { AffiliatesService } from './affiliates.service';
import { CreateAffiliateDto } from './dto/create-affiliate.dto';
import { UpdateAffiliateDto } from './dto/update-affiliate.dto';
import tooBig from 'src/exceptions-db/too-big.exception';
import cantCreate from 'src/exceptions-db/cant-create.exception';
import cantDelete from 'src/exceptions-db/cant-delete.exception';

@UseGuards(AuthGuard)
@Controller('affiliates')
export class AffiliatesController {
    constructor(private affiliatesService: AffiliatesService) { }
    
    @Get()
    getAll() { 
        return this.affiliatesService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: number) { 
        try {
            const affiliateFound = await this.affiliatesService.getById(id);
            return affiliateFound;
        } catch (error) {
            throw error;
        } 
    }
    
    @Post()
    async createAffiliate(@Body() newAffiliate: CreateAffiliateDto) {
        try {
            const createdAffiliate = await this.affiliatesService.createAffiliate(newAffiliate);  
            if (createdAffiliate.code) {
                alreadyExists(createdAffiliate);
                tooBig(createdAffiliate);
            }
            return createdAffiliate;
        } catch (error) {
            if (error.code) {
                cantCreate(error, "Não foi possível criar este affiliado, verifique se os índices informados de endereço e contatos correspondem a registros existentes no banco de dados.");
            }
            throw error;
        }
    }

    @Put(':id')
    async updateAffiliate(
        @Body() affiliateUpdate: UpdateAffiliateDto,
        @Param('id') id: number) {
        try {
            const updatedAffiliate = await this.affiliatesService.updateAffiliate(affiliateUpdate, id);
            if (updatedAffiliate.code) {
                alreadyExists(updatedAffiliate);
                tooBig(updatedAffiliate);
            }
            return updatedAffiliate;
        } catch (error) {
            throw error;
        } 
    }

    @Delete(':id') 
    async deleteAffiliate(@Param('id') id: number){
        try {
            const deletedAffiliate = await this.affiliatesService.deleteAffiliate(id);
            return deletedAffiliate;
        } catch (error) {
            if (error.code) {
                cantDelete(error, `O afiliado de índice ${id} não pode ser deletado, pois está sendo usado em uma ou mais tabela. Sugestão: Altere os registros das tabelas que usam este afiliado, informando um índice de afiliado diferente e tente deletar novamente este registro.`);
            }
            throw error;
        }
    }
}
