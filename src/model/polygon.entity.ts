import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Polygon } from 'geojson';
import { IsOptional } from 'class-validator';
@Entity('Polygon')
export class PolygonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  City_Name: String;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Polygon',
    srid: 4326,
    nullable: true,
  })
  polygon: Polygon;

  @IsOptional()
  coordinates?: number[][];
}
