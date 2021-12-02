import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonEntity } from 'src/app/models/PersonEntity.model';
import { PersonService } from '../../person.service';

@Component({
    selector: 'person-register',
    templateUrl: './person-register.component.html',
    styleUrls: ['./person-register.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PersonRegisterComponent implements OnInit, OnDestroy {


    formEntity: FormGroup = new FormGroup({});

    /**
     * constructor
     *
     * @param {PersonService} _personService
     */
    constructor(
        private _personService: PersonService,
        private _formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) {

        // Reactive Form
        this.createFormClean();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.loadFormByLocalStorage();
        this.listenActiveRoute();
        this.listenFormChanges();
    }

    
    ngAfterViewInit(): void {
      
    }


    listenActiveRoute(): void{
        this._activatedRoute.params.subscribe((params: any) => {
            if(params && params.idPerson && params.idPerson != 'new'){
                this._personService.getPerson(params.idPerson)
                .then((response:any) => this.loadPerson(response))
                .catch(() => this.callSnackBar("Ocorreu um erro ao buscar uma pessoa específica"))
            }
        });
    }

    listenFormChanges(): void{
        this.formEntity.valueChanges.subscribe((changes: any) => {
            this.setLocalStorageForm(changes);
        });
    }

    loadFormByLocalStorage(): void{
        let storageForm = localStorage.getItem('form');

        if(!storageForm) return;

        this.loadPerson(JSON.parse(storageForm));
    }

    setLocalStorageForm(valueForm: any): void{
        localStorage.setItem('form', JSON.stringify(valueForm));
    }

    clearLocalStorageForm(): void{
        localStorage.removeItem('form');
    }

    loadPerson(data: any): void{
        this.formEntity = this._formBuilder.group({
            id: [data.id],
            cpf: [data.cpf, Validators.required],
            name: [data.name, Validators.required],
            gender: [data.gender, Validators.required],
            identity: [data.identity, Validators.required],
            phone: [data.phone, Validators.required],
            mother: [data.mother, Validators.required],
            father: [data.father],
        });
    }

    saveOrUpdateEntity(): void{
        let rawData = this.formEntity.getRawValue();

        if(rawData.id != null){
            this.updateEntity(rawData);
        }else{
            this.saveEntity(rawData);
        }

        this.clearLocalStorageForm();
    }

    saveEntity(rawData: any): void{
        let messageOnSuccess = "Nova pessoa salva com sucesso";
        let messageOnError = "Ocorreu um erro ao salvar uma nova pessoa";

        let person: PersonEntity = new PersonEntity(rawData);
        
        this._personService.createPerson(person)
            .then(() => {
                this.callSnackBar(messageOnSuccess);
                this.createFormClean();
                this._router.navigate([`/home`]);
            }).catch(() => this.callSnackBar(messageOnError))
    }

    updateEntity(rawData: any): void{
        let messageOnSuccess = "Pessoa atualizado com sucesso";
        let messageOnError = "Ocorreu um erro ao atualizar uma pessoa";

        let person: PersonEntity = new PersonEntity(rawData);
        
        this._personService.updatePerson(person, person.id)
            .then(() => {
                this.callSnackBar(messageOnSuccess);
                this._router.navigate([`/home`]);
            }).catch(() => this.callSnackBar(messageOnError))
    }

    
    createFormClean(): void {
        this.formEntity = this._formBuilder.group({
            id: [null],
            cpf: [null, Validators.required],
            name: [null, Validators.required],
            gender: [null, Validators.required],
            identity: [null, Validators.required],
            phone: [null, Validators.required],
            mother: [null, Validators.required],
            father: [null],
        });
    }
    /*
     * On destroy
     */
    ngOnDestroy(): void {
        this.createFormClean();
    }


    callSnackBar(message: string): void{
        this._snackBar.open(message, 'Fechar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
    }

    
}