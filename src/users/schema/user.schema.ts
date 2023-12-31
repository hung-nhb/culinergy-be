import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop()
  hashedPassword: string;

  @Prop()
  name: string;

  @Prop({
    default: false,
  })
  isVegan: boolean;

  @Prop({
    type: [{ type: Number, ref: 'Ingredient' }],
    default: [],
  })
  allergies: number[];

  @Prop({
    type: [{ type: Number, ref: 'Recipe' }],
    default: [],
  })
  favorites: number[];
}

export const UserSchema = SchemaFactory.createForClass(User);