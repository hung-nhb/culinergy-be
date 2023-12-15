import { Controller, UseGuards, Get, Post, Body, Param, Query, Put, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RecipesService } from './recipes.service';

export interface RecommendedQuery {
  ofTheDay?: boolean;
}

export interface RecipeQuery {
  ingredients?: string[];
  name?: string;
}

@Controller('recipes')
@ApiTags('recipes')
@UseGuards(JwtAuthGuard)
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async getRecipes(@Request() req, @Query() query: RecipeQuery) {
    return this.recipesService.getRecipes(req.user.sub, query);
  }

  @Get('/recommended')
  async getRecommendedRecipes(@Request() req, @Query() query: RecommendedQuery) {
    return this.recipesService.getRecommendedRecipes(req.user.sub, query);
  }

  @Get('/favorites')
  async getFavoriteRecipes(@Request() req) {
    return this.recipesService.getFavoriteRecipes(req.user.sub);
  }

  @Get('/:recipeId')
  async getRecipe(@Request() req, @Param('recipeId') recipeId: string) {
    return this.recipesService.getRecipe(req.user.sub, recipeId);
  }

  @Put('/:recipeId/favorite')
  async toggleFavoriteRecipe(@Request() req, @Param('recipeId') recipeId: string) {
    return this.recipesService.toggleFavoriteRecipe(req.user.sub, recipeId);
  }
}
