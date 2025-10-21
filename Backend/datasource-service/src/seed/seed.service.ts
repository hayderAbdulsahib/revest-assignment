import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Order } from '../entities/order.entity';
import { OrderProduct } from '../entities/order_product.entity';
import { OrderStatusValues } from '../shared/constants/order-status-values';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
  ) {}

  async seedDatabase(): Promise<void> {
    console.log('Starting database seeding...');

    try {
      await this.clearDatabase();

      const products = await this.seedProducts();

      await this.seedOrdersWithProducts(products);

      console.log('Database seeding completed successfully!');
    } catch (error) {
      console.error('Database seeding failed:', error);
      throw error;
    }
  }

  private async clearDatabase(): Promise<void> {
    console.log('Clearing existing data...');

    // Disable foreign key checks temporarily
    await this.orderProductRepository.query('SET FOREIGN_KEY_CHECKS = 0');

    // Delete all records in the correct order
    await this.orderProductRepository.query('DELETE FROM OrderProduct');
    await this.orderRepository.query('DELETE FROM `Order`');
    await this.productRepository.query('DELETE FROM Product');

    // Re-enable foreign key checks
    await this.orderProductRepository.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('Database cleared');
  }

  private async seedProducts(): Promise<Product[]> {
    console.log('Seeding products...');

    const productData = [
      {
        name: 'Premium Wireless Headphones',
        price: 299.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'Smart Fitness Watch',
        price: 199.5,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'Bluetooth Speaker',
        price: 89.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'USB-C Fast Charger',
        price: 34.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'Gaming Mechanical Keyboard',
        price: 149.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'Wireless Mouse',
        price: 45.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'LED Monitor 24 inch',
        price: 189.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'Laptop Stand',
        price: 29.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'Webcam HD',
        price: 79.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'Noise Cancelling Headphones',
        price: 249.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'Power Bank 10000mAh',
        price: 39.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'Smartphone Case',
        price: 19.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'Tablet Stand',
        price: 24.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'External Hard Drive 1TB',
        price: 89.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'USB Hub 4 Port',
        price: 15.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'Gaming Chair',
        price: 199.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'Desk Lamp LED',
        price: 35.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'Wireless Charging Pad',
        price: 49.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'Laptop Sleeve',
        price: 25.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'Monitor Mount',
        price: 69.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'Cable Management Kit',
        price: 12.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'Blue Light Glasses',
        price: 29.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'Ergonomic Mouse Pad',
        price: 18.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'Laptop Cooling Pad',
        price: 39.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'Wireless Presenter',
        price: 59.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'Document Camera',
        price: 149.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'Ring Light',
        price: 79.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'Microphone USB',
        price: 69.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'Green Screen',
        price: 45.99,
        isActive: true,
        isDeleted: false,
      },
      {
        name: 'Stream Deck',
        price: 149.99,
        isActive: false,
        isDeleted: false,
      },
    ];

    const products = await this.productRepository.save(productData);
    console.log(`Seeded ${products.length} products`);
    return products;
  }

  private async seedOrdersWithProducts(products: Product[]): Promise<void> {
    console.log('Seeding orders with products...');

    // Create orders with nested orderProducts
    const orderData = [
      {
        status: OrderStatusValues.PENDING,
        customerName: 'John Smith',
        customerEmail: 'john.smith@email.com',
        customerPhone: '+1-555-0123',
        notes: 'Please deliver after 6 PM',
        isCanceled: false,
        orderProducts: [
          { productId: products[0].id },
          { productId: products[1].id },
          { productId: products[2].id },
          { productId: products[3].id },
        ],
      },
      {
        status: OrderStatusValues.CONFIRMED,
        customerName: 'Sarah Johnson',
        customerEmail: 'sarah.j@email.com',
        customerPhone: '+1-555-0456',
        notes: 'Gift wrapping requested',
        isCanceled: false,
        orderProducts: [
          { productId: products[4].id },
          { productId: products[5].id },
          { productId: products[6].id },
        ],
      },
      {
        status: OrderStatusValues.PROCESSING,
        customerName: 'Mike Wilson',
        customerEmail: 'mike.wilson@email.com',
        customerPhone: '+1-555-0789',
        notes: undefined,
        isCanceled: false,
        orderProducts: [
          { productId: products[7].id },
          { productId: products[8].id },
          { productId: products[9].id },
          { productId: products[10].id },
          { productId: products[11].id },
        ],
      },
      {
        status: OrderStatusValues.SHIPPED,
        customerName: 'Emily Davis',
        customerEmail: 'emily.davis@email.com',
        customerPhone: '+1-555-0321',
        notes: 'Fragile - handle with care',
        isCanceled: false,
        orderProducts: [
          { productId: products[12].id },
          { productId: products[13].id },
          { productId: products[14].id },
        ],
      },
      {
        status: OrderStatusValues.CANCELLED,
        customerName: 'Robert Brown',
        customerEmail: 'robert.brown@email.com',
        customerPhone: '+1-555-0654',
        notes: undefined,
        isCanceled: true,
        cancellationReason:
          'Customer requested cancellation due to change of mind',
        orderProducts: [
          { productId: products[15].id },
          { productId: products[16].id },
          { productId: products[17].id },
          { productId: products[18].id },
        ],
      },
      {
        status: OrderStatusValues.PENDING,
        customerName: 'Lisa Anderson',
        customerEmail: 'lisa.anderson@email.com',
        customerPhone: '+1-555-0124',
        notes: 'Leave at front door',
        isCanceled: false,
        orderProducts: [
          { productId: products[19].id },
          { productId: products[20].id },
          { productId: products[21].id },
          { productId: products[22].id },
          { productId: products[23].id },
        ],
      },
      {
        status: OrderStatusValues.CONFIRMED,
        customerName: 'David Martinez',
        customerEmail: 'david.martinez@email.com',
        customerPhone: '+1-555-0457',
        notes: 'Call before delivery',
        isCanceled: false,
        orderProducts: [
          { productId: products[24].id },
          { productId: products[25].id },
          { productId: products[26].id },
        ],
      },
      {
        status: OrderStatusValues.PROCESSING,
        customerName: 'Jennifer Taylor',
        customerEmail: 'jennifer.taylor@email.com',
        customerPhone: '+1-555-0780',
        notes: undefined,
        isCanceled: false,
        orderProducts: [
          { productId: products[27].id },
          { productId: products[28].id },
          { productId: products[29].id },
          { productId: products[0].id },
        ],
      },
      {
        status: OrderStatusValues.SHIPPED,
        customerName: 'Michael Garcia',
        customerEmail: 'michael.garcia@email.com',
        customerPhone: '+1-555-0322',
        notes: 'Office delivery',
        isCanceled: false,
        orderProducts: [
          { productId: products[1].id },
          { productId: products[2].id },
          { productId: products[3].id },
          { productId: products[4].id },
          { productId: products[5].id },
        ],
      },
      {
        status: OrderStatusValues.DELIVERED,
        customerName: 'Amanda White',
        customerEmail: 'amanda.white@email.com',
        customerPhone: '+1-555-0655',
        notes: undefined,
        isCanceled: false,
        orderProducts: [
          { productId: products[6].id },
          { productId: products[7].id },
          { productId: products[8].id },
        ],
      },
      {
        status: OrderStatusValues.PENDING,
        customerName: 'Christopher Lee',
        customerEmail: 'christopher.lee@email.com',
        customerPhone: '+1-555-0125',
        notes: 'Express delivery requested',
        isCanceled: false,
        orderProducts: [
          { productId: products[9].id },
          { productId: products[10].id },
          { productId: products[11].id },
          { productId: products[12].id },
        ],
      },
      {
        status: OrderStatusValues.CONFIRMED,
        customerName: 'Michelle Clark',
        customerEmail: 'michelle.clark@email.com',
        customerPhone: '+1-555-0458',
        notes: 'Gift message included',
        isCanceled: false,
        orderProducts: [
          { productId: products[13].id },
          { productId: products[14].id },
          { productId: products[15].id },
          { productId: products[16].id },
          { productId: products[17].id },
        ],
      },
      {
        status: OrderStatusValues.PROCESSING,
        customerName: 'James Rodriguez',
        customerEmail: 'james.rodriguez@email.com',
        customerPhone: '+1-555-0781',
        notes: undefined,
        isCanceled: false,
        orderProducts: [
          { productId: products[18].id },
          { productId: products[19].id },
          { productId: products[20].id },
        ],
      },
      {
        status: OrderStatusValues.SHIPPED,
        customerName: 'Ashley Lewis',
        customerEmail: 'ashley.lewis@email.com',
        customerPhone: '+1-555-0323',
        notes: 'Handle with care',
        isCanceled: false,
        orderProducts: [
          { productId: products[21].id },
          { productId: products[22].id },
          { productId: products[23].id },
          { productId: products[24].id },
        ],
      },
      {
        status: OrderStatusValues.DELIVERED,
        customerName: 'Daniel Walker',
        customerEmail: 'daniel.walker@email.com',
        customerPhone: '+1-555-0656',
        notes: undefined,
        isCanceled: false,
        orderProducts: [
          { productId: products[25].id },
          { productId: products[26].id },
          { productId: products[27].id },
          { productId: products[28].id },
          { productId: products[29].id },
        ],
      },
      {
        status: OrderStatusValues.PENDING,
        customerName: 'Jessica Hall',
        customerEmail: 'jessica.hall@email.com',
        customerPhone: '+1-555-0126',
        notes: 'Weekend delivery preferred',
        isCanceled: false,
        orderProducts: [
          { productId: products[0].id },
          { productId: products[1].id },
          { productId: products[2].id },
        ],
      },
      {
        status: OrderStatusValues.CONFIRMED,
        customerName: 'Ryan Allen',
        customerEmail: 'ryan.allen@email.com',
        customerPhone: '+1-555-0459',
        notes: 'Contact customer for delivery time',
        isCanceled: false,
        orderProducts: [
          { productId: products[3].id },
          { productId: products[4].id },
          { productId: products[5].id },
          { productId: products[6].id },
        ],
      },
      {
        status: OrderStatusValues.PROCESSING,
        customerName: 'Stephanie Young',
        customerEmail: 'stephanie.young@email.com',
        customerPhone: '+1-555-0782',
        notes: undefined,
        isCanceled: false,
        orderProducts: [
          { productId: products[7].id },
          { productId: products[8].id },
          { productId: products[9].id },
          { productId: products[10].id },
          { productId: products[11].id },
        ],
      },
      {
        status: OrderStatusValues.SHIPPED,
        customerName: 'Kevin King',
        customerEmail: 'kevin.king@email.com',
        customerPhone: '+1-555-0324',
        notes: 'Signature required',
        isCanceled: false,
        orderProducts: [
          { productId: products[12].id },
          { productId: products[13].id },
          { productId: products[14].id },
        ],
      },
      {
        status: OrderStatusValues.DELIVERED,
        customerName: 'Nicole Wright',
        customerEmail: 'nicole.wright@email.com',
        customerPhone: '+1-555-0657',
        notes: undefined,
        isCanceled: false,
        orderProducts: [
          { productId: products[15].id },
          { productId: products[16].id },
          { productId: products[17].id },
          { productId: products[18].id },
        ],
      },
      {
        status: OrderStatusValues.PENDING,
        customerName: 'Brandon Lopez',
        customerEmail: 'brandon.lopez@email.com',
        customerPhone: '+1-555-0127',
        notes: 'Early morning delivery',
        isCanceled: false,
        orderProducts: [
          { productId: products[19].id },
          { productId: products[20].id },
          { productId: products[21].id },
          { productId: products[22].id },
          { productId: products[23].id },
        ],
      },
      {
        status: OrderStatusValues.CONFIRMED,
        customerName: 'Rachel Hill',
        customerEmail: 'rachel.hill@email.com',
        customerPhone: '+1-555-0460',
        notes: 'Apartment building - call intercom',
        isCanceled: false,
        orderProducts: [
          { productId: products[24].id },
          { productId: products[25].id },
          { productId: products[26].id },
        ],
      },
      {
        status: OrderStatusValues.PROCESSING,
        customerName: 'Tyler Scott',
        customerEmail: 'tyler.scott@email.com',
        customerPhone: '+1-555-0783',
        notes: undefined,
        isCanceled: false,
        orderProducts: [
          { productId: products[27].id },
          { productId: products[28].id },
          { productId: products[29].id },
          { productId: products[0].id },
        ],
      },
      {
        status: OrderStatusValues.SHIPPED,
        customerName: 'Lauren Green',
        customerEmail: 'lauren.green@email.com',
        customerPhone: '+1-555-0325',
        notes: 'Leave with neighbor if not home',
        isCanceled: false,
        orderProducts: [
          { productId: products[1].id },
          { productId: products[2].id },
          { productId: products[3].id },
          { productId: products[4].id },
          { productId: products[5].id },
        ],
      },
      {
        status: OrderStatusValues.DELIVERED,
        customerName: 'Justin Adams',
        customerEmail: 'justin.adams@email.com',
        customerPhone: '+1-555-0658',
        notes: undefined,
        isCanceled: false,
        orderProducts: [
          { productId: products[6].id },
          { productId: products[7].id },
          { productId: products[8].id },
        ],
      },
      {
        status: OrderStatusValues.PENDING,
        customerName: 'Samantha Baker',
        customerEmail: 'samantha.baker@email.com',
        customerPhone: '+1-555-0128',
        notes: 'Corporate delivery',
        isCanceled: false,
        orderProducts: [
          { productId: products[9].id },
          { productId: products[10].id },
          { productId: products[11].id },
          { productId: products[12].id },
        ],
      },
      {
        status: OrderStatusValues.CONFIRMED,
        customerName: 'Ethan Nelson',
        customerEmail: 'ethan.nelson@email.com',
        customerPhone: '+1-555-0461',
        notes: 'Rush order',
        isCanceled: false,
        orderProducts: [
          { productId: products[13].id },
          { productId: products[14].id },
          { productId: products[15].id },
          { productId: products[16].id },
          { productId: products[17].id },
        ],
      },
      {
        status: OrderStatusValues.PROCESSING,
        customerName: 'Megan Carter',
        customerEmail: 'megan.carter@email.com',
        customerPhone: '+1-555-0784',
        notes: undefined,
        isCanceled: false,
        orderProducts: [
          { productId: products[18].id },
          { productId: products[19].id },
          { productId: products[20].id },
        ],
      },
      {
        status: OrderStatusValues.CANCELLED,
        customerName: 'Alexander Mitchell',
        customerEmail: 'alexander.mitchell@email.com',
        customerPhone: '+1-555-0326',
        notes: undefined,
        isCanceled: true,
        cancellationReason: 'Customer changed mind about purchase',
        orderProducts: [
          { productId: products[21].id },
          { productId: products[22].id },
          { productId: products[23].id },
          { productId: products[24].id },
        ],
      },
      {
        status: OrderStatusValues.DELIVERED,
        customerName: 'Victoria Perez',
        customerEmail: 'victoria.perez@email.com',
        customerPhone: '+1-555-0659',
        notes: undefined,
        isCanceled: false,
        orderProducts: [
          { productId: products[25].id },
          { productId: products[26].id },
          { productId: products[27].id },
          { productId: products[28].id },
          { productId: products[29].id },
        ],
      },
    ];

    await this.orderRepository.save(orderData);

    console.log(`Seeded ${orderData.length} orders with their products`);
  }

  // Method to run seeding from CLI
  async runSeed(): Promise<void> {
    await this.seedDatabase();
  }
}
