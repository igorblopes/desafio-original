import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonService } from '../../person.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector     : 'person-list',
    templateUrl  : './person-list.component.html',
    styleUrls    : ['./person-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PersonListComponent implements OnInit, OnDestroy
{
    displayedColumns: string[] = ['cpf', 'name', 'gender', 'phone', 'actions'];  
 
    // @ViewChild(MatPaginator)
    // paginator: MatPaginator;
    datasource: any[] = [];

    pageIndex: number = 0;
    pageSize: number =  10;
    totalRows: number =  0;


    // @ViewChild(MatSort)
    // sort: MatSort;

    rowSelected:any={};


    /**
     * Constructor
     *
     * @param {PersonService} _personService
     */
    constructor(
        private _personService: PersonService,
        private _snackBar: MatSnackBar,
        private _dialog: MatDialog,
        private _router: Router
      )
    {       

    }

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.openList();
    }


    ngAfterViewInit(): void {

    }

    openList(): void{
        this._personService.getPersons()
            .then((response: any[]) => {
                this.datasource = response;
            })
            .catch((error: any) => this.callSnackBar("Erro ao buscar pessoas"))
    }

    

    onSelectedRow(person: any): void{
        this._router.navigate([`/person/${person.id}`]);
    }


    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
    }

    callSnackBar(message: string): void{
        this._snackBar.open(message, 'Fechar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
    }


    deletePerson(id: number): void{
        let messageOnSuccess = "Pessoa deletada com sucesso";
        let messageOnError = "Ocorreu um erro ao deletar uma pessoa";

        const dialogRef = this._dialog.open(DeleteDialog, {
            width: '350px'
        });
    
        dialogRef.afterClosed().subscribe(result => {
            if(result){
                
                this._personService.deletePerson(id)
                    .then(() => {
                        this.callSnackBar(messageOnSuccess);
                        this.openList();  
                    })
                    .catch(() => this.callSnackBar(messageOnError))
        
            }
        
        });
    }

}


@Component({
    selector: 'delete-dialog',
    templateUrl: 'delete-dialog.component.html',
  })
  export class DeleteDialog {
    constructor(
      public dialogRef: MatDialogRef<DeleteDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close(false);
    }

    onYesClick(): void {
        this.dialogRef.close(true);
    }
}
