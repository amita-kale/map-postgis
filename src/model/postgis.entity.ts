import { IsOptional } from 'class-validator';
import { Point, Polygon } from 'geojson';

import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
@Entity('postgis')
export class PostgisEntity {
  @PrimaryGeneratedColumn()
  Id: number;
  @Column()
  Lat: string;
  @Column()
  Long: string;
  @Column()
  Name: string;
  @Column()
  City_Name: string;

  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  geom: Point;

  // @Index({ spatial: true })
  // @Column({
  //   type: 'geography',
  //   spatialFeatureType: 'Polygon',
  //   srid: 4326,
  //   nullable: true,
  // })
  // polygon?: Polygon;
  // @IsOptional()
  // coordinates?: number[][];
}
