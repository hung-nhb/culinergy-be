import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe, RecipeDocument } from './schema/recipe.schema';
import { FilterQuery, Model, Types } from 'mongoose';
import { RecipeQuery, RecommendedQuery } from './recipes.controller';

@Injectable()
export class RecipesGuestService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>
  ) {}

  async getRecipes(query: RecipeQuery) {
    const filter: FilterQuery<Recipe> = {};

    if (query.ingredients && query.ingredients.length > 0) {
      // the recipe ingredients must contain all the ingredients in the query
      filter.ingredients = { $all: query.ingredients };
    }
    
    if (query.name) {
      // the recipe name must contain the query name
      filter.name = { $regex: query.name, $options: 'i' };
    }

    const recipes = await this.recipeModel.find(filter, null, {
      skip: query.page ? (query.page - 1) * 10 : 0,
      limit: 10,
    });
    return recipes;
  }

  async getRecipe(recipeId: number) {
    const recipe = await this.recipeModel.findById(recipeId).populate('ingredients', {
      _id: 1,
      name: 1,
    });

    if (!recipe) {
      throw new HttpException('Recipe not found', 404);
    }

    return recipe.toJSON();
  }

  async getRecommendedRecipes(query: RecommendedQuery) {
    // TODO: implement recommendation logic (currently random)
    const recipeIds = await this.recipeModel.find({}).select('_id');
    let recipes: RecipeDocument[];

    if (query.ofTheDay) {
      // get a random recipe depending on the hour of the day
      const hour = new Date().getHours();
      const randomRecipeId = recipeIds[hour % recipeIds.length]._id;
      recipes = await this.recipeModel.find({ _id: randomRecipeId });
    } else {
      const randomRecipeIds = recipeIds.sort(() => Math.random() - Math.random()).slice(0, 3).map(recipe => recipe._id);
      recipes = await this.recipeModel.find({ _id: { $in: randomRecipeIds } });
    }

    return recipes;
  }
}
