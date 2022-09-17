import { Test, TestingModule } from '@nestjs/testing';
import { PostgisController } from './postgis.controller';

describe('PostgisController', () => {
  let controller: PostgisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostgisController],
    }).compile();

    controller = module.get<PostgisController>(PostgisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
