import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { status } from './ticket.types';

@Injectable()
export class TicketService {
  constructor(@InjectRepository(Ticket) private repo: Repository<Ticket>) {}

  create(title: string, description: string, currentUserId: number) {
    const createdBy = currentUserId
    const ticket = this.repo.create({ title, description, createdBy });

    return this.repo.save(ticket);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, attrs: Partial<Ticket>, currentUserId: number) {
    const ticket = await this.findOne(id);

    if (!ticket) {
      throw new NotFoundException();
    }
    Object.assign(ticket, attrs);
    return this.repo.save(ticket);
  }

  async approveReject(id: number, status: status, currentUserId: number) {
    let ticket = await this.findOne(id);

    if (!ticket) {
      throw new NotFoundException();
    }

    ticket.status = status
    ticket.updatedBy = currentUserId
    ticket.updatedAt = new Date()
    
    if(status === "APPROVED"){

      ticket.approvedBy = currentUserId
      ticket.approvedAt = new Date()

    } else if(status === "REJECTED"){

      ticket.rejectedBy = currentUserId
      ticket.rejectedAt = new Date()

    }
    
    return this.repo.save(ticket);
  }

}
