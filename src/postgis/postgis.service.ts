import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { PostgisEntity } from 'src/model/postgis.entity';
import { PostgisInterface } from 'src/model/postgis.interface';
import { Repository } from 'typeorm';

@Injectable()
export class PostgisService {
  constructor(
    @InjectRepository(PostgisEntity)
    private readonly postgisRepository: Repository<PostgisEntity>,
  ) {}

  findAllPostgisData(): Observable<PostgisEntity[]> {
    return from(this.postgisRepository.find());
  }

  createPointOnMap(
    postgisInterface: PostgisInterface,
  ): Observable<PostgisInterface> {
    return from(this.postgisRepository.save(postgisInterface));
  }
}
