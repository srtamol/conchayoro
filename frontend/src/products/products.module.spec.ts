import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { ProductsModule } from './products.module';

const databaseConnection: SequelizeModuleOptions = {
dialect: 'sqlite',
omitNull: true,
autoLoadModels: true,
synchronize: true,
};

describe('ProductsModule', () => {
let app: INestApplication;
beforeEach(async () => {
const moduleFixture: TestingModule = await Test.createTestingModule({
imports: [SequelizeModule.forRoot(databaseConnection), ProductsModule],
}).compile();
  
app = moduleFixture.createNestApplication();
await app.init();
});
it('GET /products', async () => {
return request(await app.getHttpServer())
.get('/products')
.expect(200)
.expect('[]');
});
afterAll(async () => {
await app.close();
});
});
