import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'watch'
})
export class WatchPipe implements PipeTransform {

    /**
     * Transform seconds in minutes like a watch
     * Ex: 110 ~> 1:50
     * @param value seconds
     */
    transform(value: number): string {
        if (value) {
            var mins = Math.floor(value / 60);
            var secs = value % 60;
            return ('0' + mins).slice(-1) + ':' + ('00' + secs).slice(-2);
        }
        return '0:00';
    }

}