import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type RecipeDocument = HydratedDocument<Recipe>;

@Schema()
export class Recipe {
  @Prop({
    unique: true,
    required: true,
  })
  name: string;

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
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Ingredient' }],
    default: [],
  })
  ingredients: MongooseSchema.Types.ObjectId[];

  @Prop()
  instructions: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);