import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { OrderProduct } from './order_product.entity';

@Entity({ name: 'Order' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: [
      'pending',
      'confirmed',
      'processing',
      'shipped',
      'delivered',
      'cancelled',
    ],
    default: 'pending',
  })
  status: string;

  @Column('text', { nullable: true })
  cancellationReason: string;

  @Column({ length: 100 })
  customerName: string;

  @Column({ length: 255 })
  customerEmail: string;

  @Column({ length: 50 })
  customerPhone: string;

  @Column('text', { nullable: true })
  notes: string;

  @Column({ default: false })
  isCanceled: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    cascade: true,
  })
  orderProducts: OrderProduct[];
}
