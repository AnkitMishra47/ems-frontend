export class Employee{
    id: number;
    name: string;
    email:string;
    mobile:string;
    IsNewObject : boolean;

    constructor(){
        this.IsNewObject = true;
    }
}