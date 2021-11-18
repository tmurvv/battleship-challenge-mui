// packages
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

// internal
import { 
    getGridItemNumber,
    getGridAlphaNumber 
} from './utils';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('getGridItemNumber function', () => {     
    test('should return correct grid item number', ()=> {
        expect(getGridItemNumber()).toBe('Error, label not defined');
        expect(getGridItemNumber('D4')).toBe(27);
        expect(getGridItemNumber('D3')).toBe(19);
        expect(getGridItemNumber('g1')).toBe(6);
        expect(getGridItemNumber('h8')).toBe(63);
        expect(getGridItemNumber('A1')).toBe(0);
        expect(getGridItemNumber('A2')).toBe(8);
        expect(getGridItemNumber('B2')).toBe(9);
        expect(getGridItemNumber('J2')).toBe('Error. Letter must be between A and H.');
        expect(getGridItemNumber('B9')).toBe('Error. Number must be between 1 and 8.');
        expect(getGridItemNumber('B19')).toBe('Error. Number must be between 1 and 8.');
    });   
});
describe('getGridAlphaNumber function', () => {     
    test('should return correct grid item alphanum label', ()=> {
        expect(getGridAlphaNumber()).toBe('Error, grid number not defined.');
        expect(getGridAlphaNumber(25)).toBe('B4');
        expect(getGridAlphaNumber(18)).toBe('C3');
        expect(getGridAlphaNumber(9)).toBe('B2');
        expect(getGridAlphaNumber(8)).toBe('A2');
        expect(getGridAlphaNumber(16)).toBe('A3');
        expect(getGridAlphaNumber(63)).toBe('H8');
        expect(getGridAlphaNumber(0)).toBe('A1');
        expect(getGridAlphaNumber(-5)).toBe('Error, grid number out of range.');
        expect(getGridAlphaNumber(64)).toBe('Error, grid number out of range.');
    });   
});
