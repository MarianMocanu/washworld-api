import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from 'data.source';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRoot(dbConfig)],
  controllers: [],
})
export class AppModule {}
