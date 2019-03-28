import { TestBed, inject, async } from '@angular/core/testing';
import { StarWarsService } from './star-wars.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StarWarsService', () => {

    beforeEach(() => TestBed.configureTestingModule({
        providers: [StarWarsService],
        imports: [HttpClientTestingModule]
    }));

    it('should be created', () => {
        const service: StarWarsService = TestBed.get(StarWarsService);
        expect(service).toBeTruthy();
    });

    it('should validate returned object structure', async(inject([StarWarsService], (service: StarWarsService) => {
        service.getCharacters().subscribe((res: any) => {
            expect(res).toBeTruthy();
            expect(res['results'].length).toBeGreaterThan(9999);
        });
    })));

});