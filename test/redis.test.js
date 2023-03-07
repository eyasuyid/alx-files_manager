import chai from 'chai';
import { promisify } from 'util'
import client from '../utils/redis'

const expect = chai.expect;

describe('utils redis', function () {

  async function testAlive() {
    return client.isAlive();
  }

  const asyncTestAlive = promisify(testAlive).bind(client);


  it('isAlive', async function () {
    expect(asyncTestAlive).to.equal(false);
  });


});