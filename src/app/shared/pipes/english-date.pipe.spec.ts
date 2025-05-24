import { EnglishDatePipe } from './english-date.pipe';

describe('FrenchDatePipe', () => {
  it('create an instance', () => {
    const pipe = new EnglishDatePipe();
    expect(pipe).toBeTruthy();
  });
});
