import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { Ticket } from './ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from 'src/users/guards/auth.guard';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from 'src/users/interceptors/current-user.interceptor';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    UsersModule,
  ],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
