
export class DisplaySlider {

    private bookId:string;
    private name:string;
    private picUrl:string;
    private type:string;

    constructor(){}
    
    public getBookId(): string {
        return this.bookId;
    }

    public setBookId(bookId: string): void {
        this.bookId = bookId;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getPicUrl(): string {
        return this.picUrl;
    }

    public setPicUrl(picUrl: string): void {
        this.picUrl = picUrl;
    }

    public getType(): string {
        return this.type;
    }

    public setType(type: string): void {
        this.type = type;
    }



}