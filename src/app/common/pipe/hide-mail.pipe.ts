import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'hidemail'
})
export class HideMailPipe implements PipeTransform {

    /**
     * Transform an email hiding email's domain for privacity reasons
     * @param value user's email
     */
    transform(value: string): string {
        if (value) {
            // find index of '@'
            const indexDomain = value.indexOf('@');

            // find index of first '.' (dot)
            const indexDot = value.indexOf('.');

            // separate email
            // Ex: fulano@gmail.com ~> fulano@
            const strPartOne = value.substring(0, indexDomain + 1);

            // separate email
            // Ex: fulano@gmail.com ~> .com
            const strPartTwo = value.substring(indexDot, value.length);
            
            // create 'hider' string according with domain size
            // Ex: @google.com ~> @******.com
            // google has 6 char, so, 'hider' will have 6 char too
            let strHide = "";
            for(let i = 0; i < value.length - (strPartOne.length + strPartTwo.length); i++) {
                strHide += "*";
            }
            
            // concat parts of the email
            //       fulano@*****.com
            // Ex:   fulano@  +  *****  + .com
            return strPartOne + strHide + strPartTwo;
        }
    }

}