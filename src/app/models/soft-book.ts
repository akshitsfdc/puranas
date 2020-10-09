export class SoftBook {

    private bookId:string;
    private description:string;
    private downloadUrl:string;
    private fileName:string;
    private free:boolean;
    private language:string;
    private name:string;
    private pages:string;
    private picUrl:string;
    private price:number;
    private videoOption:boolean;
    private booksInPart:boolean;
    private bookParts: string[] = [];
    private type:string;
    private priority:number;
    private isOneOfThePart:boolean;
    private searchKeywords:string[] = [];

    constructor(){

    }
    

    public getSearchKeywords(): string[] {
        return this.searchKeywords;
    }

    public setSearchKeywords(searchKeywords: string[]): void {
        this.searchKeywords = searchKeywords;
    }

    public getBookId(): string {
        return this.bookId;
    }

    public setBookId(bookId: string): void {
        this.bookId = bookId;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getDownloadUrl(): string {
        return this.downloadUrl;
    }

    public setDownloadUrl(downloadUrl: string): void {
        this.downloadUrl = downloadUrl;
    }

    public getFileName(): string {
        return this.fileName;
    }

    public setFileName(fileName: string): void {
        this.fileName = fileName;
    }

    public isFree(): boolean {
        return this.free;
    }

    public setFree(free: boolean): void {
        this.free = free;
    }

    public getLanguage(): string {
        return this.language;
    }

    public setLanguage(language: string): void {
        this.language = language;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getBookParts(): string[] {
        return this.bookParts;
    }

    public setBookParts(bookParts: string[]): void {
        this.bookParts = bookParts;
    }

    public getPages(): string {
        return this.pages;
    }

    public setPages(pages: string): void {
        this.pages = pages;
    }

    public getPicUrl(): string {
        return this.picUrl;
    }

    public setPicUrl(picUrl: string): void {
        this.picUrl = picUrl;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public isVideoOption(): boolean {
        return this.videoOption;
    }

    public setVideoOption(videoOption: boolean): void {
        this.videoOption = videoOption;
    }

    public isBooksInPart(): boolean {
        return this.booksInPart;
    }

    public setBooksInPart(booksInPart: boolean): void {
        this.booksInPart = booksInPart;
    }

    public getType(): string {
        return this.type;
    }

    public setType(type: string): void {
        this.type = type;
    }

    public getPriority(): number {
        return this.priority;
    }

    public setPriority(priority: number): void {
        this.priority = priority;
    }

    public isIsOneOfThePart(): boolean {
        return this.isOneOfThePart;
    }

    public setIsOneOfThePart(isOneOfThePart: boolean): void {
        this.isOneOfThePart = isOneOfThePart;
    }


}