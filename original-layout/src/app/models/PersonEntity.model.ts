export class PersonEntity{

    id: number = 0;
    cpf: number = 0;
    name: string = "";
    gender: string = "";
    identity: number = 0;
    phone: number = 0;
    mother: string = "";
    father: string = "";

    constructor(person: any){
        this.id = person.id;
        this.cpf = person.cpf;
        this.name = person.name;
        this.gender = person.gender;
        this.identity = person.identity;
        this.phone = person.phone;
        this.mother = person.mother;
        this.father = person.father;
    }


}