import { Injectable, NotFoundException } from '@nestjs/common';
import { DataBaseService } from 'src/database/database.service';
import validateIdAndReturnRecord from 'src/utils/validate-return';

@Injectable()
export class StatesService {
    constructor(private db: DataBaseService){}

    async getAll() {
        return this.db.states.findMany();
    }

    async getById(id: number, mensage: string = "Estado não encontrado.") {
        let state: any;
        
        state = await validateIdAndReturnRecord(id, this.db.states);
        
        if (!state) { 
            throw new NotFoundException(mensage);
        }
        
        return state; 
    }
}
