import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class CommitService {

  private baseUrl: string = "http://localhost:8090/gitreplay/build";

  constructor(private http: Http) {
  }

  init(configuration: any) {
    return this.http.post(this.baseUrl + "/init", configuration)
  }

  setCurrentCommit(commit: string) {
    return this.http.post(this.baseUrl + "/current-commit/" + commit, null)
  }

  getCurrentCommit() {
    return this.http.get(this.baseUrl + "/current-commit")
      .map(
        (response: Response) => {
          return response.json();
        }
      ).catch(
        (error: Response) => {
          console.log(error);
          return Observable.throw(error);
        }
      );
  }

  getCommits() {
    return this.http.get(this.baseUrl + "/commits")
      .map(
        (response: Response) => {
          return response.json();
        }
      ).catch(
        (error: Response) => {
          console.log(error);
          return Observable.throw(error);
        }
      );
  }

}
