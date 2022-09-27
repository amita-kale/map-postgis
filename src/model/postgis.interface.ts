import { IsOptional } from 'class-validator';
import { Point, Polygon } from 'geojson';

export interface PostgisInterface {
  Id?: number;

  Lat?: string;

  Long?: string;

  Name?: string;

  City_Name?: string;
  //Geometry?: 'GeoJSON';
  geom?: Point;
  // polygon?: number[][];
}
