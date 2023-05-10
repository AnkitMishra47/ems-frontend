export class Employee{
    id: number;
    name: string;
    email:string;
    mobile:string;
    IsNewObject : boolean;
    gender : any;

    constructor(){
        this.IsNewObject = true;
    }
}