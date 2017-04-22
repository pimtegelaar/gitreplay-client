import { GitreplayClientPage } from './app.po';

describe('gitreplay-client App', () => {
  let page: GitreplayClientPage;

  beforeEach(() => {
    page = new GitreplayClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
