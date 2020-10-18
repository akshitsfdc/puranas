

export class SearchAnalytics {

    private email:string;
    private name:string;
    private prime:boolean;
    private searchedKeyword:string;
    private timestamp:string;
    private userId:string;


    constructor(){}

    
    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public isPrime(): boolean {
        return this.prime;
    }

    public setPrime(prime: boolean): void {
        this.prime = prime;
    }

    public getSearchedKeyword(): string {
        return this.searchedKeyword;
    }

    public setSearchedKeyword(searchedKeyword: string): void {
        this.searchedKeyword = searchedKeyword;
    }

    public getTimestamp(): string {
        return this.timestamp;
    }

    public setTimestamp(timestamp: string): void {
        this.timestamp = timestamp;
    }

    public getUserId(): string {
        return this.userId;
    }

    public setUserId(userId: string): void {
        this.userId = userId;
    }

}