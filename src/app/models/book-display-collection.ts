import { BookDisplay } from './book-display';

export class  BookDisplayCollection{

    private bookDisplayCollection: BookDisplay[];

    constructor(){}

    public getBookDisplayCollection(): BookDisplay[] {
        return this.bookDisplayCollection;
    }

    public setBookDisplayCollection(bookDisplayCollection: BookDisplay[]): void {
        this.bookDisplayCollection = bookDisplayCollection;
    }

}