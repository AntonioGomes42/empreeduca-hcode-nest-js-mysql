import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { StatesService } from './states.service';

@UseGuards(AuthGuard)
@Controller('states')
export class StatesController {
    constructor(private statesService: StatesService) { }
    
    @Get()
    listAll() {
        return this.statesService.getAll();
    }
}
