import slugify from 'slugify';
import { Injectable } from "@nestjs/common";

@Injectable()
export class SlugService {
    generateSlug(text: string) {
        return slugify(text, { lower: true });
    }
}