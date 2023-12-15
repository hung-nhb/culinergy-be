import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RecipeDocument = HydratedDocument<Recipe>;

@Schema()
export class Recipe {
  @Prop({
    unique: true,
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
    type: [{ type: Types.ObjectId, ref: 'Ingredient' }],
    default: [],
  })
  ingredients: Types.ObjectId[];

  @Prop()
  instructions: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);