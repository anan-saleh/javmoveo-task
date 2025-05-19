import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

const ConfigModuleForRoot = ConfigModule.forRoot();

const mongooseConnectionOptions = {
  retryAttempts: 1,
  retryDelay: 1000,
};

const mongooseForRoot = MongooseModule.forRoot(
  process.env.MONGO_URI,
  mongooseConnectionOptions,
);

const imports = [ConfigModuleForRoot, mongooseForRoot, UsersModule, AuthModule];

@Module({
  imports: imports,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
