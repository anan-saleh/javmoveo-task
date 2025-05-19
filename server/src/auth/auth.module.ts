import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';

const secret =
  '1e6a5b1a3fbcd4e1d446450ca3a7d1ebd2fea6ae17c69af9749bb01b136b0e3277f755069780d375e4e0db87fbfc9d0c4a17929837cc1708b4685cc756eee9c8cc69caaf4cf24f5412d1e95daa33812be5c169b62d9336ed1b4e3c0e991b68a36e28fca27007734c8a0a652a2a5c8be801869c4da7bf2eba8d983ad43f72ad36c80405144de3e9f9438ef1cf1b85a98fd3721a03c52cd33abc719363cbe4c410c36691ae1cec104661a7505286deac7454564ce52f4a31136778ce3191e7bb2fcf8ce43c630ccf4219c9b2233e83d1f6daa40cb8f631b08c49436b130143d62829b5a38483ee0712cf0dd98826b5cb88a2125c67f01a062bf9644823c9287c48';
const JwtModuleRegister = JwtModule.register({
  secret, //todo: find out why process.env.JWT_SECRET not working process.env.JWT_SECRET,
  signOptions: { expiresIn: '1h' },
});

@Module({
  imports: [UsersModule, JwtModuleRegister],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
