import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module';

const ENV = process.env.NODE_ENV

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: [!ENV ? '.env' : `.env.${ENV}`]
  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
