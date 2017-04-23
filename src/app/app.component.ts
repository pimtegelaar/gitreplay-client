import {Component} from '@angular/core';
import {CommitService} from "./commit-service";
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Git replay';
  currentCommit = null;
  currentIndex = 0;

  repositoryLocation = null;
  localBranch = null;
  upstreamBranch = null;

  commits = [];

  constructor(private commitService: CommitService) {

  }

  onInit() {
    this.commitService.init({
      repositoryLocation: this.repositoryLocation,
      localBranch: this.localBranch,
      upstreamBranch: this.upstreamBranch
    }).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  updateCurrentCommit(currentCommit: any) {
    this.currentCommit = currentCommit;
    this.currentIndex = this.commitIndexOf(currentCommit);
  }

  commitIndexOf(o: any) {
    for (let i = 0; i < this.commits.length; i++) {
      if (this.commits[i].name == o.name) {
        return i;
      }
    }
    return -1;
  }

  onSetCurrentCommit(currentCommit: any) {
    this.updateCurrentCommit(currentCommit);
    this.commitService.setCurrentCommit(currentCommit.name).subscribe(
      (response) => console.log(response),
      (error) => console.log(error));
  }

  onGetCurrentCommit() {
    this.commitService.getCurrentCommit().subscribe(
      (currentCommit: any) => {
        this.updateCurrentCommit(currentCommit);
      },
      (error) => console.log(error)
    );

  }

  onGetCommits() {
    this.commitService.getCommits().subscribe(
      (commits: any[]) => {
        this.commits = commits;
      },
      (error) => console.log(error)
    );
  }

  getColor(index: number) {
    if (this.currentIndex > index) return '#e6fee6';
    if (this.currentIndex < index) return 'white';
    return 'lightyellow';
  }
}
