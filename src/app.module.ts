import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { IngredientsModule } from './ingredients/ingredients.module';

@Module({
  imports: [UsersModule, IngredientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
