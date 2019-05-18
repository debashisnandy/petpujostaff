import { NgModule } from '@angular/core';

import {MatButtonModule, 
    MatButtonToggleModule,
    MatCheckboxModule, 
    MatToolbarModule, 
    MatIconModule, 
    MatSidenavModule, 
    MatListModule, 
    MatCardModule, 
    MatGridListModule , 
    MatProgressSpinnerModule,
    MatChipsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule, 
    MatTableModule,
    MatMenuModule,
    MatSnackBarModule} from '@angular/material';

@NgModule({
    imports:[
        MatButtonModule, 
        MatButtonToggleModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatToolbarModule, 
        MatIconModule, 
        MatSidenavModule,
        MatListModule,
        MatFormFieldModule,
        MatCardModule,
        MatChipsModule,
        MatDialogModule,
        MatTableModule,
        MatInputModule,
        MatGridListModule,
        MatSnackBarModule,
        MatMenuModule
    ],
    exports:[
        MatButtonModule, 
        MatButtonToggleModule,
        MatCheckboxModule,
        MatToolbarModule, 
        MatIconModule, 
        MatSidenavModule,
        MatProgressSpinnerModule,
        MatListModule,
        MatFormFieldModule,
        MatCardModule,
        MatChipsModule,
        MatDialogModule,
        MatTableModule,
        MatInputModule,
        MatGridListModule,
        MatSnackBarModule,
        MatMenuModule
    ]
})
export class  MatComponentModule{

}