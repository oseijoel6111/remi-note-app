import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import databaseConfig from './config/databaseConfig';

const ENV = process.env.PORT

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [!ENV ? '.env' : `.env.${ENV}`],
      load: [configuration, databaseConfig]
    }),
    TypeOrmModule.forRootAsync(
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          type: 'mysql',
          autoLoadEntities: true,
          synchronize: true,
          port: configService.get("database.port"),
          username: configService.get("database.username"),
          password: configService.get("database.password"),
          database: configService.get("database.name")
        })
      }
    ),
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }