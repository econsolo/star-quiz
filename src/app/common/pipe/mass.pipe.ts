import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mass'
})
export class MassPipe implements PipeTransform {

    /**
     * Transform some number in a friendly Mass in Kg number
     * @param value Mass (kg) number
     */
    transform(value: string): string {
        return value + ' kg';
    }

}