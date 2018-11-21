import { ReversePipe } from "./reverse.pipe";

// Reverse pipes are totally isolated from angular, so it doesn't depends on angular
// That's why it doesn't require any setup before testing
// But we can create pipes which can depend on angular

// Use it when you want to testing something which doesn't depend on angular
// then use this isolated testing 
describe('Pipe: ReversePipe', () => {
    it('Should create the app', () => {
        let reversePipe = new ReversePipe();
        expect(reversePipe.transform('hello')).toEqual('olleh');
    });
});
