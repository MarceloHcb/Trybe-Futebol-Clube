import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { matchesMock } from './mocks/matchesMock';

chai.use(chaiHttp);
const { expect } = chai;

describe('Leaderboard testes na rota /leaderboard', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('GET /leaderboard/home deve retornar status 200 e uma lista de partidas em casa', async () => {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesMock as any);
    const { status } = await chai.request(app).get('/leaderboard/home');
    expect(status).to.be.equal(200);    
  });

  it('GET /leaderboard/away deve retornar status 200 e uma lista de partidas fora', async () => {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesMock as any);
    const { status } = await chai.request(app).get('/leaderboard/away');
    expect(status).to.be.equal(200);  
  });

  it('GET /leaderboard deve retornar status 200 e uma lista de partidas', async () => {    
    const { status } = await chai.request(app).get('/leaderboard');
    expect(status).to.be.equal(200);    
  });  
});
