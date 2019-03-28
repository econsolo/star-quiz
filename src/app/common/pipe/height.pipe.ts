import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'height'
})

export class HeightPipe implements PipeTransform {

    /**
     * Transform some number in a friendly Height (m) number
     * @param value Height (cm) number
     */
    transform(value: number): string {
        return (value / 100).toFixed(2) + ' m';
    }

}