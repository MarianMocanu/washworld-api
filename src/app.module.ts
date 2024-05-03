import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from 'data.source';
import { UserModule } from './user/user.module';
import { LocationModule } from './location/location.module';
import { ServiceModule } from './service/service.module';
import { StepsModule } from './steps/steps.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRoot(dbConfig), UserModule, LocationModule, ServiceModule, StepsModule],
  controllers: [],
})
export class AppModule {}
