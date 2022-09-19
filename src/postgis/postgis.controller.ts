import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { readFileSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Observable } from 'rxjs';
import { PostgisInterface } from 'src/model/postgis.interface';
import { DeleteResult } from 'typeorm';
import { PostgisService } from './postgis.service';
import { parse } from 'papaparse';
import { PostgisEntity } from 'src/model/postgis.entity';
import { Point } from 'geojson';

@Controller('postgis')
export class PostgisController {
  constructor(private readonly postgisService: PostgisService) {}
  @Get() findAll(): Observable<PostgisInterface[]> {
    return this.postgisService.findAllPostgisData();
  }

  @Get('get/:csv')
  seeUploadedFile(@Param('csv') csv, @Res() res) {
    return res.sendFile(csv, { root: './uploads' });
  }

  @Post() create(
    @Body() postgisInterface: PostgisInterface,
  ): Observable<PostgisInterface> {
    return this.postgisService.createPointOnMap(postgisInterface);
  }

  @Delete(':id') delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.postgisService.deletePost(id);
  }

  @Post('/file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadFile() {
    var dataObject = [];
    const csvFile = readFileSync('uploads/postgis.csv');
    const csvData = csvFile.toString();
    const parsedCsv = await parse(csvData, {
      header: true,
      skipEmptyLines: true,
      //  transformHeader:(header)=> header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data,
    });

    console.log('csv file', parsedCsv.data);
    dataObject = parsedCsv.data;
    dataObject.filter((element) => {
      var geom: Point = {
        type: 'Point',
        coordinates: [element.long, element.lat],
      };
      console.log('objects', element);
      let entityObject = new PostgisEntity();
      entityObject.Lat = element.lat;
      entityObject.Long = element.long;
      entityObject.Name = element.Name;
      entityObject.City_Name = element.City_Name;
      entityObject.geom = geom;
      console.log('entityObject', entityObject);

      return this.postgisService.createPointOnMap(entityObject);
    });
  }
  // handleUpload(@UploadedFile() file: Express.Multer.File) {
  //   console.log('file', file);
  //   return 'File upload API';
  // }
}
