import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { UsersModule } from 'src/users/users.module';
import { Recipe, RecipeSchema } from './schema/recipe.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipesGuestService } from './recipes-guest.service';
import { RecipesGuestController } from './recipes-guest.controller';

@Module({
  providers: [RecipesService, RecipesGuestService],
  controllers: [RecipesController, RecipesGuestController],
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Recipe.name, schema: RecipeSchema },
    ]),
  ],
})
export class RecipesModule {}
