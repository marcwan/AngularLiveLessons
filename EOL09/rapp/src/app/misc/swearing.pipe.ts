import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'noswearing' })
export class SwearingFilter implements PipeTransform {

    bad_words: string[] = [
        'poop',
        'crap',
        'darn',
        'butt'
    ];

    transform(value: string, replacement: string = '(oh dear!)'): string {
        for (const bad_word of this.bad_words) {
            value = value.replace(bad_word, replacement);
        }

        return value;
    }
}
