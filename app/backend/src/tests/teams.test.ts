import * as sinon from 'sinon';
import * as chai from 'chai';
import  SequelizeTeam  from '../database/models/SequelizeTeams';
import { teamsMock } from './mocks/teamsMock';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Team tests na rota /teams', () => {
  it('"GET"  deve retornar status 200', async() => {
  sinon.stub(SequelizeTeam, 'findAll').resolves(teamsMock as any);
  const {status, body} = await chai.request(app).get('/teams');
    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(teamsMock)
  });
  
  it('"GET" /:id  deve retornar um objeto pelo id ', async function() {
    sinon.stub(SequelizeTeam, 'findOne').resolves(teamsMock[0] as any);
    const { status, body } = await chai.request(app).get('/teams/1');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamsMock[0]);
    sinon.restore();
  });
  it('"GET" /:id  deve retornar erro se não existir time com o id ', async function() {
    sinon.stub(SequelizeTeam, 'findOne').resolves(null);
    const { status, body } = await chai.request(app).get('/teams/111');
    expect(status).to.equal(404);
    expect(body.message).to.equal('Time 111 não encontrado');
  });
});
