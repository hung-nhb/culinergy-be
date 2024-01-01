import { Controller, UseGuards, Get, Post, Body, Param, Query, Put, Request } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RecipesService } from './recipes.service';

export interface RecommendedQuery {
  ofTheDay?: boolean;
}

export interface RecipeQuery {
  ingredients?: number[];
  name?: string;
  page?: number;
}

@Controller('recipes')
@ApiTags('recipes')
@UseGuards(JwtAuthGuard)
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  @ApiQuery({ name: 'ingredients', required: false })
  @ApiQuery({ name: 'name', required: false })
  async getRecipes(@Request() req, @Query() query: { ingredients?: string, name?: string, page?: number }) {
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
    return this.recipesService.getRecipes(req.user.sub, parsedQuery);
  }

  @Get('/recommended')
  @ApiQuery({ name: 'ofTheDay', required: false })
  async getRecommendedRecipes(@Request() req, @Query() query: RecommendedQuery) {
    return this.recipesService.getRecommendedRecipes(req.user.sub, query);
  }

  @Get('/favorites')
  async getFavoriteRecipes(@Request() req) {
    return this.recipesService.getFavoriteRecipes(req.user.sub);
  }

  @Get('/:recipeId')
  async getRecipe(@Request() req, @Param('recipeId') recipeId: number) {
    return this.recipesService.getRecipe(req.user.sub, recipeId);
  }

  @Put('/:recipeId/favorite')
  async toggleFavoriteRecipe(@Request() req, @Param('recipeId') recipeId: number) {
    return this.recipesService.toggleFavoriteRecipe(req.user.sub, recipeId);
  }
}
