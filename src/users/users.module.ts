import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { Ingredient, IngredientSchema } from 'src/ingredients/schema/ingredient.schema';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Ingredient.name, schema: IngredientSchema }
    ])
  ],
  exports: [UsersService],
})
export class UsersModule {}
