import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../data.source';
import { UserModule } from './user/user.module';
import { LocationModule } from './locations/locations.module';
import { ServiceModule } from './service/service.module';
import { StepsModule } from './steps/steps.module';
import { LevelsModule } from './levels/levels.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { TerminalModule } from './terminal/terminal.module';
import { EventModule } from './event/event.module';
import { CarModule } from './car/car.module';
import { InvoicesModule } from './invoices/invoices.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseService } from './database.service';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dbConfig),
    UserModule,
    LocationModule,
    ServiceModule,
    StepsModule,
    LevelsModule,
    SubscriptionModule,
    TerminalModule,
    EventModule,
    CarModule,
    InvoicesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
