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
    type: [{ type: Types.ObjectId, ref: 'Ingredient' }],
    default: [],
  })
  allergies: Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Recipe' }],
    default: [],
  })
  favorites: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);