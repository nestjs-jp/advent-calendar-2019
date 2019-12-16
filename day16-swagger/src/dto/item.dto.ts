import { Item } from 'src/model/item.model';
import { ApiProperty } from '@nestjs/swagger';

/* tslint:disable:max-classes-per-file */

export class GetItemsResponse {
    @ApiProperty({ type: [Item], example: [{ id: 1, name: 'test' }] })
    items: Item[];
}

export class GetItemsRequest {
    @ApiProperty({ type: [String], example: ['1', '2', '3'] })
    ids: string[];
}
