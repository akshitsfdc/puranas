import { DisplaySlider } from './display-slider-model';

export class  BookDisplay{

    private bookDisplaySliders: DisplaySlider[];
    private headerTitle:string;

    constructor(){
       
    }
    
    public getBookDisplaySliders(): DisplaySlider[] {
        return this.bookDisplaySliders;
    }

    public setBookDisplaySliders(bookDisplaySliders: DisplaySlider[]): void {
        this.bookDisplaySliders = bookDisplaySliders;
    }

    public getHeaderTitle(): string {
        return this.headerTitle;
    }

    public setHeaderTitle(headerTitle: string): void {
        this.headerTitle = headerTitle;
    }


   
   


}