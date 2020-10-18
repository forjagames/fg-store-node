import { ICredentials } from "../interfaces/credentiales.interface";
export declare class ForjaGamesAPI {
    private static session;
    private static credentials;
    private static get url();
    private static get sessionIsExpired();
    static initialize(credentials: ICredentials): Promise<void>;
    static get(url: string): Promise<any>;
    static post(url: string, data: any): Promise<any>;
    private static getAuthToken;
    private static login;
}
//# sourceMappingURL=forja-games.api.d.ts.map