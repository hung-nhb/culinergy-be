import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Ingredient } from './schema/ingredient.schema';
import { Model } from 'mongoose';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>
  ) {}

  async findAll() {
    return this.ingredientModel.find();
  }
}
