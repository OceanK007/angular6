import { Component } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { Response } from "@angular/http";
import { FirebaseAuthService } from "../auth/firebase.auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    constructor(private dataStorageService: DataStorageService, private firebaseAuthService: FirebaseAuthService) {}

    onSaveData() {
        this.dataStorageService.storeRecipes().subscribe(
            (response: Response) => {
                console.log(response);
            }
        );
    }

    fetchData() {
        this.dataStorageService.getRecipes();
    }

    onLogout() {
        this.firebaseAuthService.logout();
    }
}