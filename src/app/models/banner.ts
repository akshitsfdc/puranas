
export class  Banner{

    private externalLink:boolean;
    private externalUrl:string;
    private imageUrl:string;
    private moveTo:string;

    constructor(){}

    public isExternalLink(): boolean {
        return this.externalLink;
    }

    public setExternalLink(externalLink: boolean): void {
        this.externalLink = externalLink;
    }

    public getExternalUrl(): string {
        return this.externalUrl;
    }

    public setExternalUrl(externalUrl: string): void {
        this.externalUrl = externalUrl;
    }

    public getImageUrl(): string {
        return this.imageUrl;
    }

    public setImageUrl(imageUrl: string): void {
        this.imageUrl = imageUrl;
    }

    public getMoveTo(): string {
        return this.moveTo;
    }

    public setMoveTo(moveTo: string): void {
        this.moveTo = moveTo;
    }
}

