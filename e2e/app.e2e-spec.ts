import { CommandsPage } from './app.po';

describe('commands App', () => {
  let page: CommandsPage;

  beforeEach(() => {
    page = new CommandsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
