import { Controller } from '@nestjs/common';
import { Post, Get, Patch, Body, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { TicketService } from './ticket.service';
import { UpdateTicketDto } from './dtos/update-ticket.dto';
import { AuthGuard } from 'src/users/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';


@Controller('ticket')
export class TicketController {

  constructor(private ticketService: TicketService) {}

  
  @Post()
  @UseGuards(AuthGuard)
  createTicket(@Body() body: CreateTicketDto, @CurrentUser() currentUser: User) {
     return this.ticketService.create(body.title, body.description, currentUser.id)
  }

  @Get('/:id')

  async findTicket(@Param('id') id: string) {
    const ticket = await this.ticketService.findOne(parseInt(id));
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    return ticket;
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  updateTicket(@Param('id') id: string, @Body() body: UpdateTicketDto, @CurrentUser() currentUser: User) {
    return this.ticketService.update(parseInt(id), body, currentUser.id);
  }

  @Patch('/approve/:id')
  @UseGuards(AuthGuard)
  approveTicket(@Param('id') id: string, @Body() body: UpdateTicketDto, @CurrentUser() currentUser: User) {
    return this.ticketService.approveReject(parseInt(id), 'APPROVED', currentUser.id);
  }

  @Patch('/reject/:id')
  @UseGuards(AuthGuard)
  rejectTicket(@Param('id') id: string, @Body() body: UpdateTicketDto, @CurrentUser() currentUser: User) {
    return this.ticketService.approveReject(parseInt(id), 'REJECTED', currentUser.id);
  }



}
