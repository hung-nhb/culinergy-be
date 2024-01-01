import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RecipeDocument = HydratedDocument<Recipe>;

@Schema()
export class Recipe {
  @Prop({
    type: Number,
  })
  _id: number;

  @Prop({
    required: true,
  })
  name: string;

  @Prop()
  imageUrl: string;

  @Prop()
  description: string;

  @Prop()
  timeToCook: string;

  @Prop({
    default: 0,
  })
  favoriteCount: number;

  @Prop()
  tags: string[];

  @Prop({
    type: [{ type: Number, ref: 'Ingredient' }],
    default: [],
  })
  ingredients: number[];

  @Prop()
  instructions: string[];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);