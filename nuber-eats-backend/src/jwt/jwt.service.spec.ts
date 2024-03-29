import {JwtService} from "./jwt.service";
import * as jwt from "jsonwebtoken"
import {Test} from "@nestjs/testing";
import {CONFIG_OPTIONS} from "../common/common.constants";

const TEST_KEY = 'testKey'
const TOKEN = "TOKEN"
const USER_ID = 1

jest.mock('jsonwebtoken', () => {
    return {
        sign: jest.fn(() => "TOKEN"),
        verify: jest.fn(()=> ({id: USER_ID}))
    }
})

describe('JewService', () => {
    let service: JwtService
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [JwtService, {
                provide: CONFIG_OPTIONS,
                useValue: {privateKey: TEST_KEY},
            }]
        }).compile()
        service = module.get<JwtService>(JwtService)
    })
    it('should be defined', function () {
        expect(service).toBeDefined()
    });
    describe('sign', () => {
        it('should return a signed token', function () {
            service.sign(USER_ID)
            expect(jwt.sign).toHaveBeenCalledTimes(1)
            expect(jwt.sign).toHaveBeenLastCalledWith({id: USER_ID}, TEST_KEY)
        });
    })
    describe('verify', () => {
        it('should return the decoded token', function () {
            const decodedToken = service.verify(TOKEN)
            expect(decodedToken).toEqual({id: USER_ID})
            expect(jwt.verify).toHaveBeenCalledTimes(1)
            expect(jwt.verify).toHaveBeenLastCalledWith(TOKEN, TEST_KEY)
        });
    })
})

/***
import { Test, TestingModule } from '@nestjs/testing';
import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interfaces';
import { JwtService } from './jwt.service';

import * as jwt from 'jsonwebtoken';

const TEST_PRIVATE = 'this_is_test_private_key';
const TEST_ID = 123456789;
const MOCKED_TOKEN = 'ThisIsMockedToken';

const jwtOptions: JwtModuleOptions = {
  privateKey: TEST_PRIVATE,
};

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => MOCKED_TOKEN),
  verify: jest.fn(() => ({ id: TEST_ID })),
}));

describe('JwtService', () => {
  let service: JwtService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        { provide: CONFIG_OPTIONS, useValue: jwtOptions },
      ],
    }).compile();
    service = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Test sign method', () => {
    it('should return MOCKED_TOKEN', () => {
      const token = service.sign(TEST_ID);

      expect(jwt.sign).toHaveBeenCalledTimes(1);
      expect(jwt.sign).toHaveBeenCalledWith({ id: TEST_ID }, TEST_PRIVATE);
      expect(token).toEqual(MOCKED_TOKEN);
      expect(typeof token).toEqual('string');
    });
  });

  describe('Test verify method', () => {
    it('should return {id: TEST_ID}', () => {
      const decoded = service.verify(MOCKED_TOKEN);

      expect(jwt.verify).toHaveBeenCalledTimes(1);
      expect(jwt.verify).toHaveBeenCalledWith(MOCKED_TOKEN, TEST_PRIVATE);
      expect(decoded).toEqual({ id: TEST_ID });
      expect(typeof decoded).toEqual('object');
    });
  });
});

 */