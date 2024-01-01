import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe, RecipeDocument } from './schema/recipe.schema';
import { FilterQuery, Model, Types } from 'mongoose';
import { RecipeQuery, RecommendedQuery } from './recipes.controller';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RecipesService {
  constructor(
    private readonly usersService: UsersService,
    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>
  ) {}

  async getRecipes(email: string, query: RecipeQuery) {
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
    const user = await this.usersService.findOneByEmail(email);
    const favorites = user.favorites;
    return this.attachIsFavoriteToRecipes(recipes, favorites);
  }

  async getRecipe(email: string, recipeId: number) {
    const recipe = await this.recipeModel.findById(recipeId).populate('ingredients', {
      _id: 1,
      name: 1,
    });

    if (!recipe) {
      throw new HttpException('Recipe not found', 404);
    }

    const user = await this.usersService.findOneByEmail(email);
    const favorites = user.favorites;
    return {
      ...recipe.toJSON(),
      isFavorite: favorites.some(favorite => favorite.toString() === recipe._id.toString()),
    };
  }

  async getRecommendedRecipes(email: string, query: RecommendedQuery) {
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

    const user = await this.usersService.findOneByEmail(email);
    const favorites = user.favorites;
    return this.attachIsFavoriteToRecipes(recipes, favorites);
  }

  async getFavoriteRecipes(email: string) {
    const user = await this.usersService.findOneByEmail(email);
    const favorites = user.favorites;
    const recipes = await this.recipeModel.find({ _id: { $in: favorites } });
    return this.attachIsFavoriteToRecipes(recipes, favorites);
  }

  async toggleFavoriteRecipe(email: string, recipeId: number) {
    const user = await this.usersService.findOneByEmail(email);
    const recipe = await this.recipeModel.findById(recipeId);

    if (!recipe) {
      throw new HttpException('Recipe not found', 404);
    }

    const isFavorite = user.favorites.some(favorite => favorite === recipeId);

    if (isFavorite) {
      user.favorites = user.favorites.filter(favorite => favorite !== recipeId);
      recipe.favoriteCount--;
    } else {
      user.favorites.push(recipe._id);
      recipe.favoriteCount++;
    }

    await user.save();
    await recipe.save();
    // return the recipe with the updated favoriteCount, isFavorite
    return {
      ...recipe.toJSON(),
      isFavorite: !isFavorite,
    };
  }

  attachIsFavoriteToRecipes(recipes: RecipeDocument[], favorites: number[]) {
    return recipes.map(recipe => ({
      ...recipe.toJSON(),
      isFavorite: favorites.some(favorite => favorite === recipe._id),
    }));
  }
}
