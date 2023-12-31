import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type IngredientDocument = HydratedDocument<Ingredient>;

@Schema()
export class Ingredient {
  @Prop({
    type: Number,
  })
  _id: number;

  @Prop({
    required: true,
  })
  name: string;

  @Prop()
  description: string;

  @Prop({
    type: Object,
  })
  nutritionInfo: Object;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);