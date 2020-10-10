import { Banner } from './banner';

export class  BannerCollection{

    private bannerUrls:Banner[];

    constructor(){}
    
    public getBannerUrls(): Banner[] {
        return this.bannerUrls;
    }

    public setBannerUrls(bannerUrls: Banner[]): void {
        this.bannerUrls = bannerUrls;
    }

}