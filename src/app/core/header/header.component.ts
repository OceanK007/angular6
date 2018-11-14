import { Component } from "@angular/core";
import { DataStorageService } from "../../shared/data-storage.service";
import { FirebaseAuthService } from "../../auth/firebase-auth.service";
import { HttpEvent, HttpEventType } from "@angular/common/http";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    constructor(private dataStorageService: DataStorageService, private firebaseAuthService: FirebaseAuthService) {}

    onSaveData() {
        this.dataStorageService.storeRecipes().subscribe(
            (response) => {
                console.log(response);
                // For bigger files, you will get multiple events DownloadProgress, UploadProgress, 
                // Where two parameters loaded and total will give u inputs for progress bar %

                // console.log(response.type); // it will print 0, 1 , 2, 3, 4
                
                // // 0
                // if(response.type === HttpEventType.Sent) { 
                //     console.log("Sent Event")
                // } 
                // // 1
                // if(response.type === HttpEventType.UploadProgress) { 
                //     console.log("UploadProgress Event")
                // } 
                // // 2
                // if(response.type === HttpEventType.ResponseHeader) { 
                //     console.log("ResponseHeader Event")
                // } 
                // // 3
                // if(response.type === HttpEventType.DownloadProgress) {                     
                //     console.log("DownloadProgress Event")
                // }                 
                // // 4
                // if(response.type === HttpEventType.Response) { 
                //     console.log("Reponse Event")
                // } 
            }
        );
    }

    // // With fetching data with 3rd parameter (for requesting events)
    // onSaveData() {
    //     this.dataStorageService.storeRecipes().subscribe(
    //         (response: HttpEvent<Object>) => {
    //             console.log(response);
    //             if(response.type === HttpEventType.Sent) { // To check event type
    //                 console.log("Sent Event")
    //             } 
    //             if(response.type === HttpEventType.Response) {
    //                 console.log("Response Event");
    //             }
    //             // Other events are : User, Response, DownloadProgress, ResponseHeader, UploadProgress
    //         }
    //     );
    // }
    

    fetchData() {
        this.dataStorageService.getRecipes();
    }

    onLogout() {
        this.firebaseAuthService.logout();
    }

    isAuthenticated() {
        return this.firebaseAuthService.isAuthenticated();
    }
}