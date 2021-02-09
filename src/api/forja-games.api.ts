import Axios from "axios";
import { ApiUrls } from "../constants/urls";
import { ICredentials } from "../interfaces/credentials.interface";
import { ILoginInfo } from "../interfaces/login-info.interface";

export class ForjaGamesAPI {
  private static session: ILoginInfo;
  private static credentials: ICredentials;

  private static get url(): string {
    return (ApiUrls as any)[this.credentials.environment || "production"];
  }

  private static get sessionIsExpired() {
    return !this.session || (this.session.expiration && this.session.expiration <= new Date());
  }

  static async initialize(credentials: ICredentials) {
    this.credentials = credentials;
    await this.login();
  }

  static async get(url: string) {
    const auth = await this.getAuthToken();
    const response = await Axios.get(url, { auth });
    return response.data;
  }

  static async post(url: string, data: any) {
    const auth = await this.getAuthToken();
    const response = await Axios.post(url, data, { auth });
    return response.data;
  }

  private static async getAuthToken() {
    if (this.sessionIsExpired) {
      await this.login();
    }

    const username = this.credentials.projectId;
    const password = this.session.token;

    return { username, password };
  }

  private static async login() {
    const response = await Axios.post(`${this.url}/login`, this.credentials);
    this.session = response.data as ILoginInfo;
    return true;
  }
}
