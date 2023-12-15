import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    UsersModule, 
    IngredientsModule, 
    AuthModule,

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['environments/local.env'],
    }),

    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),

    RecipesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
