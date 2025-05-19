import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

const mongooseModuleForFeatureProps = [
  {
    name: User.name,
    schema: UserSchema,
  },
];
const mongooseModuleForFeature = MongooseModule.forFeature(
  mongooseModuleForFeatureProps,
);

@Module({
  imports: [mongooseModuleForFeature],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
