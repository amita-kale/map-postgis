import { Point } from 'geojson';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}
