import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import envValidate from './config/env.validate';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleModule } from './vehicle/vehicle.module';
import { BookingModule } from './booking/booking.module';
import databaseConfig from './config/database.config';
import { TrailerModule } from './trailer/trailer.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalResponseInterceptor } from './common/global.response.interceptor';
import { ClientBookingModule } from './client.booking/client.booking.module';
import { RegionModule } from './region/region.module';
import { ProvinceModule } from './province/province.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, databaseConfig],
      validationSchema: envValidate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        synchronize: configService.get('databaseConfig.sync'),
        autoLoadEntities: configService.get('databaseConfig.autoLoad'),
        host: configService.get('databaseConfig.host'),
        port: configService.get('databaseConfig.port'),
        username: configService.get('databaseConfig.user'),
        password: configService.get('databaseConfig.password'),
        database: configService.get('databaseConfig.db'),
      }),
    }),
    UserModule,
    VehicleModule,
    BookingModule,
    TrailerModule,
    ClientBookingModule,
    RegionModule,
    ProvinceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: GlobalResponseInterceptor },
  ],
})
export class AppModule {}
