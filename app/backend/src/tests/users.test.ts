import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import JWT from '../utils/JWT';
import Validations from '../middlewares/Validations';

chai.use(chaiHttp);
const { expect } = chai;

describe('Login tests na rota /login', () => {
  it('"Post"  deve retornar status 200 e retornar o token ao efetuar login', async() => {
    sinon.stub(SequelizeUser, 'findOne').resolves({email:'admin@admin.com', password:'$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' }as any)
    sinon.stub(JWT, 'sign').returns('validToken');
    const {status, body} = await chai.request(app).post('/login')
    .send({ email: 'admin@admin.com', password: 'secret_admin' });
    expect(status).to.be.equal(200);
    expect(body.token).not.to.be.undefined;
    sinon.restore();
  });
  it('"Post" rota /login  deve retornar status 401 ao enviar email inválido', async() => {
    sinon.stub(SequelizeUser, 'findOne').resolves({email:'admin@admin.com', password:'$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' }as any)
    sinon.stub(JWT, 'sign').returns('validToken');
    const {status, body} = await chai.request(app).post('/login')
    .send({ email: 'admiadmin.com', password: 'secret_admin' });
    expect(status).to.be.equal(401);
    expect(body.message).to.be.equal('Invalid email or password');
    sinon.restore();
  });
  it('"Post" rota /login  deve retornar status 401 ao enviar password inválido', async() => {
    sinon.stub(SequelizeUser, 'findOne').resolves({email:'admin@admin.com', password:'$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' }as any)
    sinon.stub(JWT, 'sign').returns('validToken');
    const {status, body} = await chai.request(app).post('/login')
    .send({ email: 'admin@admin.com', password: 'secretadmin' });
    expect(status).to.be.equal(401);
    expect(body.message).to.be.equal('Invalid email or password');
    sinon.restore();
  });
  it('"Post" rota /login  deve retornar status 400 caso não envie o campo "email"', async() => {
    const {status, body} = await chai.request(app).post('/login')
    .send({ email: '', password: 'secret_admin' });
    expect(status).to.be.equal(400);
    expect(body.message).to.be.equal('All fields must be filled');
    sinon.restore();
  });
  it('"Post" rota /login  deve retornar status 400 caso não envie o campo "password"', async() => {
    const {status, body} = await chai.request(app).post('/login')
    .send({ email: 'admin@admin.com', password: '' });
    expect(status).to.be.equal(400);
    expect(body.message).to.be.equal('All fields must be filled');
  }); 
});
