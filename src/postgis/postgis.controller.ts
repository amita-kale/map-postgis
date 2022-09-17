import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PostgisInterface } from 'src/model/postgis.interface';
import { PostgisService } from './postgis.service';

@Controller('postgis')
export class PostgisController {
  constructor(private readonly postgisService: PostgisService) {}
  @Get() findAll(): Observable<PostgisInterface[]> {
    return this.postgisService.findAllPostgisData();
  }
}
