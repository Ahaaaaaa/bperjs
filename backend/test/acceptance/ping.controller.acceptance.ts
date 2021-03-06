import {
  Client,
  createRestAppClient,
  givenHttpServerConfig,
} from '@loopback/testlab';
import {Application} from '../..';

describe('PingController', () => {
  let app: Application;
  let client: Client;

  before(givenAnApplication);

  before(async () => {
    await app.boot();
    await app.start();
  });

  before(() => {
    client = createRestAppClient(app);
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /ping', async () => {
    await client.get('/ping?msg=world').expect(200);
  });

  function givenAnApplication() {
    app = new Application({
      rest: givenHttpServerConfig(),
    });
  }
});
