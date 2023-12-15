import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { UsersModule } from 'src/users/users.module';
import { Recipe, RecipeSchema } from './schema/recipe.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [RecipesService],
  controllers: [RecipesController],
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Recipe.name, schema: RecipeSchema },
    ]),
  ],
})
export class RecipesModule {}
