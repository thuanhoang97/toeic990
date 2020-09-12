process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const request = require('supertest');
const User = require('../models/user.model');
const app = require('../server');
const db = require('../db');

let agent = null;
let server = null;

describe('Auth API', () => {
  before((done) => {
    db.connect(process.env.TEST_DB_URI).then(() => {
      server = app.listen(process.env.TEST_PORT, done);
      agent = request.agent(server);
    });
  });

  after((done) => {
    server.close(done);
  });

  describe('Register API', () => {
    const baseAPI = '/api/auth/register';

    beforeEach(async () => {
      await User.deleteMany({});
    });

    it('Register without info', async () => {
      const res = await agent.post(baseAPI).send({});
      res.status.should.be.eql(400);
      res.body.should.have.keys(
        'firstName',
        'lastName',
        'username',
        'password',
        'password2'
      );
    });

    it('Register without firstName', async () => {
      const res = await agent.post(baseAPI).send({
        lastName: 'test',
        username: 'test',
        password: 'password',
        password2: 'password',
      });
      res.status.should.be.eql(400);
      res.body.should.have.property('firstName');
    });

    it('Register without lastName', async () => {
      const res = await agent.post(baseAPI).send({
        firstName: 'test',
        username: 'test',
        password: 'password',
        password2: 'password',
      });
      res.status.should.be.eql(400);
      res.body.should.have.property('lastName');
    });

    it('Register without username', async () => {
      const res = await agent.post(baseAPI).send({
        firstName: 'test',
        lastName: 'test',
        password: 'password',
        password2: 'password',
      });
      res.status.should.be.eql(400);
      res.body.should.have.property('username');
    });

    it('Register without password', async () => {
      const res = await agent.post(baseAPI).send({
        firstName: 'test',
        lastName: 'test',
        username: 'test',
      });
      res.status.should.be.eql(400);
      res.body.should.have.keys('password', 'password2');
    });

    it('Register with wrong confirm password', async () => {
      const res = await agent.post(baseAPI).send({
        firstName: 'test',
        lastName: 'test',
        username: 'test',
        password: 'password',
        password2: 'password2',
      });
      res.status.should.be.eql(400);
      res.body.should.have.property('password2');
    });

    it('Register with short password', async () => {
      const res = await agent.post(baseAPI).send({
        firstName: 'test',
        lastName: 'test',
        username: 'test',
        password: '123',
        password2: '123',
      });

      res.status.should.be.eql(400);
      res.body.should.have.property('password');
    });

    it('Register with exist username', async () => {
      await User.create({
        firstName: 'test',
        lastName: 'test',
        username: 'test',
        password: 'password',
        password2: 'password',
      });

      const res = await agent.post(baseAPI).send({
        firstName: 'test',
        lastName: 'test',
        username: 'test',
        password: 'password',
        password2: 'password',
      });

      res.status.should.be.eql(400);
      res.body.should.have.property('username');
    });

    it('Register success', async () => {
      const res = await agent.post(baseAPI).send({
        firstName: 'test',
        lastName: 'test',
        username: 'test',
        password: 'password',
        password2: 'password',
      });

      res.status.should.be.eql(201);
      res.body.should.have.keys('firstName', 'lastName', '_id', 'username');
    });
  });

  describe('Login API', () => {
    const baseAPI = '/api/auth/login';
    const rawUser = {
      firstName: 'test',
      lastName: 'test',
      username: 'test',
      password: 'password',
      password2: 'password',
    };
    before(async () => {
      await User.deleteMany({});
      await agent.post('/api/auth/register').send(rawUser);
    });

    it('Login without info', async () => {
      const res = await agent.post(baseAPI).send({});
      res.status.should.be.eql(400);
      res.body.should.have.keys('username', 'password');
    });

    it('Login without username', async () => {
      const res = await agent.post(baseAPI).send({
        password: rawUser.password,
      });
      res.status.should.be.eql(400);
      res.body.should.have.property('username');
    });

    it('Login without password', async () => {
      const res = await agent.post(baseAPI).send({
        username: rawUser.username,
      });
      res.status.should.be.eql(400);
      res.body.should.have.property('password');
    });

    it('Login with wrong password', async () => {
      const res = await agent.post(baseAPI).send({
        username: rawUser.username,
        password: '???',
      });
      res.status.should.be.eql(400);
      res.body.should.have.property('password');
    });

    it('Login success', async () => {
      const { username, password } = rawUser;
      const res = await agent.post(baseAPI).send({ username, password });
      res.status.should.be.eql(200);
      res.body.should.have.property('token');
    });
  });
});
