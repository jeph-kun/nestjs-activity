import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    AuthGuard,
    UsersService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },

  ],
  controllers: [UsersController],
})
export class UsersModule {}
