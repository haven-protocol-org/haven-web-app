
import { convertMoneyToBalance } from "./utility";



it('atomic unit conversion', () => {
    expect(convertMoneyToBalance(12).toString()).toBe('12000000000000');
    expect(convertMoneyToBalance(12.679).toString()).toBe('12679000000000');
    expect(convertMoneyToBalance(12.000000000001).toString()).toBe('12000000000001');
    expect(convertMoneyToBalance(12.0000000000011).toString()).toBe('12000000000001');
    expect(convertMoneyToBalance(12.000000000001112121).toString()).toBe('12000000000001');
    expect(convertMoneyToBalance(0.0000000000011).toString()).toBe('1');
});

