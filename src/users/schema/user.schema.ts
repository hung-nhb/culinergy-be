import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

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
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Ingredient' }],
    default: [],
  })
  allergies: MongooseSchema.Types.ObjectId[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Recipe' }],
    default: [],
  })
  favorites: MongooseSchema.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);