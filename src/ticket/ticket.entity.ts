import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { status } from './ticket.types';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: "PENDING" })
  status: status;

  @Column()
  createdBy: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: null })
  updatedBy: number | null;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ default: null })
  approvedBy: Number | null;

  @Column({ default: null })
  approvedAt: Date | null;

  @Column({ default: null })
  rejectedBy: number | null;

  @Column({ default: null })
  rejectedAt: Date | null;
}
