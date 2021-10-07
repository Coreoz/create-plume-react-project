import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

global.fetch = require('node-fetch');

configure({ adapter: new Adapter() });
