import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Polygon } from 'geojson';
import { from, Observable } from 'rxjs';
import { PolygonEntity } from 'src/model/polygon.entity';
import { PostgisEntity } from 'src/model/postgis.entity';
import { PostgisInterface } from 'src/model/postgis.interface';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class PostgisService {
  constructor(
    @InjectRepository(PostgisEntity)
    private readonly postgisRepository: Repository<PostgisEntity>,
  ) {}
  // @InjectRepository(PolygonEntity)
  // private readonly polygonRepository: Repository<any>,

  findAllPostgisData(): Observable<PostgisEntity[]> {
    return from(this.postgisRepository.find());
  }

  createPointOnMap(
    postgisInterface: PostgisInterface,
  ): Observable<PostgisInterface> {
    return from(this.postgisRepository.save(postgisInterface));
  }

  async saveFile(file: any): Promise<any> {
    const csv = require('csvtojson');
    const csvFilePath = process.cwd() + '/' + file.path;
    let c;
    let locationData = await csv()
      .fromFile(csvFilePath)
      .then(function (data) {
        c = data;
      });
  }
  // async createPolygon(polygonEntity: PolygonEntity): Promise<any> {
  //   //  const { polygon} = createParcelPointDto;
  //   // console.log(createParcelPointDto,"DTO")
  //   console.log(polygonEntity);

  //   const polygon = {
  //     type: 'Polygon',
  //     coordinates: [polygonEntity.coordinates], //Need one more dimension here.
  //   };

  //   const parcel = this.polygonRepository.create({
  //     City_Name: polygonEntity.City_Name,
  //     polygon,
  //   });
  //   await this.polygonRepository.save(parcel);
  //   return parcel;
  // }

  deletePost(id: number): Observable<DeleteResult> {
    return from(this.postgisRepository.delete(id));
  }
}
