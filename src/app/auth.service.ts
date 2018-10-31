export class AuthService {
    // loggedIn = false;   // This is false so authentication will be failed
    loggedIn = true;

    isAuthenticated() {
        const promise = new Promise((resolve, reject) => 
        {
            setTimeout(() => 
            {
                resolve(this.loggedIn);
            }, 800);
        });

        return promise;
    }

    login() {
        this.loggedIn = true;
    }

    logout() {
        this.loggedIn = false;
    }
}