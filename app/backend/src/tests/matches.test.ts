import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import SequelizeMatch from '../database/models/SequelizeMatch';
import JWT from '../utils/JWT';
import Validations from '../middlewares/Validations';
import { matchesMock } from './mocks/matchesMock';

chai.use(chaiHttp);
const { expect } = chai;

describe('Match testes na rota /matches', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('GET /matches deve retornar status 200 e uma lista de partidas', async () => {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesMock as any);
    const { status, body } = await chai.request(app).get('/matches');
    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(matchesMock);
  });

  it('GET /matches?inProgress=true deve retornar status 200 e lista de partidas em andamento', async () => {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesMock.filter(match => match.inProgress) as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');
    const expectedMatches = matchesMock.filter(match => match.inProgress);
    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(expectedMatches);
  });

  it('GET /matches/:id/finish finaliza uma partida', async () => {
    sinon.stub(SequelizeMatch, 'update').resolves(matchesMock as any);    
    sinon.stub(JWT, 'verify').resolves();
    const { status, body } = await chai.request(app).patch('/matches/41/finish ')
    .set('authorization', 'validToken');
    expect(status).to.be.equal(200);    
    expect(body).to.deep.equal({ message: 'Finished' });
  });
  it('GET /matches/:id/finish recebe erro ao não passar token valido', async () => {
    sinon.stub(SequelizeMatch, 'update').resolves(matchesMock as any);   
    
    const { status, body } = await chai.request(app).patch('/matches/41/finish ')
    .set('authorization', 'validToken');
    expect(status).to.be.equal(401);    
    expect(body).to.deep.equal({ message: 'Token must be a valid token' });
  });
});
