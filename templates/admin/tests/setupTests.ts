import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

const fetch = require('node-fetch');
const { Headers, Request, Response } = require('node-fetch');

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

configure({ adapter: new Adapter() });
