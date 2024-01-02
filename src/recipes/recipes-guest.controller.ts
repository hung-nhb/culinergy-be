import { Controller, UseGuards, Get, Post, Body, Param, Query, Put, Request } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { RecipeQuery, RecommendedQuery } from './recipes.controller';
import { RecipesGuestService } from './recipes-guest.service';

@Controller('guest/recipes')
@ApiTags('guest/recipes')
export class RecipesGuestController {
  constructor(private readonly recipesGuestService: RecipesGuestService) {}

  @Get()
  @ApiQuery({ name: 'ingredients', required: false })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'page', required: false })
  async getRecipes(@Query() query: { ingredients?: string, name?: string, page?: number }) {
    // NOTE: this is probably not the best way to parse the query
    const parsedQuery: RecipeQuery = {};
    if (query.ingredients) {
      parsedQuery.ingredients = query.ingredients.split(',').map(Number);
    }
    if (query.name) {
      parsedQuery.name = query.name;
    }
    if (query.page) {
      parsedQuery.page = query.page;
    }
    return this.recipesGuestService.getRecipes(parsedQuery);
  }

  @Get('/recommended')
  @ApiQuery({ name: 'ofTheDay', required: false })
  async getRecommendedRecipes(@Query() query: RecommendedQuery) {
    return this.recipesGuestService.getRecommendedRecipes(query);
  }

  @Get('/:recipeId')
  async getRecipe(@Param('recipeId') recipeId: number) {
    return this.recipesGuestService.getRecipe(recipeId);
  }
}
