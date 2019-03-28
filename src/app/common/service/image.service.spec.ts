import { TestBed, inject } from '@angular/core/testing';
import { ImageService } from './image.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ImageService', () => {

    beforeEach(() => TestBed.configureTestingModule({
        providers: [ImageService],
        imports: [HttpClientTestingModule]
    }));

    it('should be created', () => {
        const service: ImageService = TestBed.get(ImageService);
        expect(service).toBeTruthy();
    });

    it('should validate returned object structure', inject([ImageService], (service: ImageService) => {
        service.getImage('starwars').subscribe((res: any) => {
            expect(res['items'].length).toBe(1);
            expect(res['items'][0]['link']).toBeTruthy();
            expect(typeof res['items'][0]['link']).toEqual('string');
        });
    }));

});