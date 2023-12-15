import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IngredientDocument = HydratedDocument<Ingredient>;

@Schema()
export class Ingredient {
  @Prop({
    unique: true,
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