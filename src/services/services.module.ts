import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { DataBaseModules } from "src/database/database.module";
import { ServicesController } from "./services.controller";
import { ServicesService } from "./services.service";

@Module({
    imports: [
    JwtModule.registerAsync({
        useFactory: () => ({
            secret: process.env.JWT_SECRET,
            signOptions: {
            expiresIn: `${process.env.JWT_EXPIRES_IN}s`,
            },
        }),
    }), DataBaseModules],
    controllers: [ServicesController],
    providers: [ServicesService]
})
export class ServicesModule {}