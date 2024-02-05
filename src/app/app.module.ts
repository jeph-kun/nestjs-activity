import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UsersModule } from 'src/users/users.module';
import { TicketModule } from 'src/ticket/ticket.module';
import { User } from 'src/users/user.entity';
import { Ticket } from 'src/ticket/ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Ticket],
      synchronize: true,
    }),
    UsersModule,
    TicketModule
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
