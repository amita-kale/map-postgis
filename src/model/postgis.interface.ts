import { Point } from 'geojson';

export interface PostgisInterface {
  Id?: number;

  Lat?: string;

  Long?: string;

  Name?: string;

  City_Name?: string;
  geom?: Point;
}
