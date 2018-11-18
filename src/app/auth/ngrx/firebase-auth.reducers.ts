import * as FirebaseAuthActionsImport from './firebase-auth.actions';

export interface State {
    token: string;
    authenticated: boolean;
}

const initialState: State =
{
    token: null,
    authenticated: false
};

export function firebaseAuthReducer(state = initialState, action: FirebaseAuthActionsImport.FirebaseAuthActions) {
    switch(action.type) {
        case (FirebaseAuthActionsImport.SIGNUP):
        case (FirebaseAuthActionsImport.SIGNIN):
            return {
                ...state,
                authenticated: true
            };
        case (FirebaseAuthActionsImport.LOGOUT):
            return {
                ...state,
                token: null,
                authenticated: false
            };
        default:
            return state;
    }
}