import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgisEntity } from 'src/model/postgis.entity';
import { PostgisController } from './postgis.controller';
import { PostgisService } from './postgis.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostgisEntity])],
  controllers: [PostgisController],
  providers: [PostgisService],
})
export class PostgisModule {}
