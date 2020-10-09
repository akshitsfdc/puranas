export class HardItem {

    private bookId:string;//
    private deliveryCharge:number;//
    private available:boolean;//
    private allPicsUrls:string[];//
    private discount:number;//
    private merchant:string;
    private description:string;//
    private language:string;//
    private name:string;//
    private pages:string;//
    private picUrl:string;//
    private price:number;//
    private priority:number;//
    private type:string;//
    private stock:number;//
    private searchKeywords:string[];//
    private isBook:boolean;//
    private material:string;//

    constructor(){
        this.searchKeywords = [];
        this.allPicsUrls = [];
    }
    public getBookId(): string {
        return this.bookId;
    }

    public setBookId(bookId: string): void {
        this.bookId = bookId;
    }

    public getDeliveryCharge(): number {
        return this.deliveryCharge;
    }

    public setDeliveryCharge(deliveryCharge: number): void {
        this.deliveryCharge = deliveryCharge;
    }

    public isAvailable(): boolean {
        return this.available;
    }

    public setAvailable(available: boolean): void {
        this.available = available;
    }

    public getAllPicsUrls(): string[] {
        return this.allPicsUrls;
    }

    public setAllPicsUrls(allPicsUrls: string[]): void {
        this.allPicsUrls = allPicsUrls;
    }

    public getDiscount(): number {
        return this.discount;
    }

    public setDiscount(discount: number): void {
        this.discount = discount;
    }

    public getMerchant(): string {
        return this.merchant;
    }

    public setMerchant(merchant: string): void {
        this.merchant = merchant;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
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

    public getPriority(): number {
        return this.priority;
    }

    public setPriority(priority: number): void {
        this.priority = priority;
    }

    public getType(): string {
        return this.type;
    }

    public setType(type: string): void {
        this.type = type;
    }

    public getStock(): number {
        return this.stock;
    }

    public setStock(stock: number): void {
        this.stock = stock;
    }

    public getSearchKeywords(): string[] {
        return this.searchKeywords;
    }

    public setSearchKeywords(searchKeywords: string[]): void {
        this.searchKeywords = searchKeywords;
    }

    public isIsBook(): boolean {
        return this.isBook;
    }

    public setIsBook(isBook: boolean): void {
        this.isBook = isBook;
    }

    public getMaterial(): string {
        return this.material;
    }

    public setMaterial(material: string): void {
        this.material = material;
    }



}