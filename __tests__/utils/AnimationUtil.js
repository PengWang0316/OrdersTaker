import { animateOrderNumber } from '../../app/utils/AnimationUtil';

jest.mock('animejs', () => jest.fn());

describe('AnimationUtil', () => {
  test('animateOrderNumber', () => {
    const mockGetElementByIdFn = jest.fn().mockReturnValue(null);
    const mockClearTimeoutFn = jest.fn();
    const mockSetTimeoutFn = jest.fn().mockReturnValue({});

    window.document.getElementById = mockGetElementByIdFn;
    window.clearTimeout = mockClearTimeoutFn;
    window.setTimeout = mockSetTimeoutFn;

    // The first call.
    animateOrderNumber();
    expect(mockGetElementByIdFn).toHaveBeenCalledTimes(1);
    expect(mockGetElementByIdFn).toHaveBeenLastCalledWith('orderNumberBadge');
    expect(mockClearTimeoutFn).not.toHaveBeenCalled();
    expect(mockSetTimeoutFn).toHaveBeenCalledTimes(1);
    expect(mockSetTimeoutFn).toHaveBeenLastCalledWith(animateOrderNumber, 200);

    // The second call.
    animateOrderNumber();
    expect(mockGetElementByIdFn).toHaveBeenCalledTimes(2);
    expect(mockClearTimeoutFn).toHaveBeenCalledTimes(1);
    expect(mockClearTimeoutFn).toHaveBeenLastCalledWith({});
    expect(mockSetTimeoutFn).toHaveBeenCalledTimes(2);

    // Changing the getElementById to return a value.
    mockGetElementByIdFn.mockReturnValue({});
    const anime = require('animejs');
    // Making the third call
    animateOrderNumber();
    expect(mockGetElementByIdFn).toHaveBeenCalledTimes(3);
    expect(anime).toHaveBeenCalledTimes(1);
    expect(anime).toHaveBeenLastCalledWith({
      targets: {},
      scale: [
        { value: 1.5, duration: 350, elasticity: 100 },
        { value: 1, delay: 550, duration: 250, elasticity: 100 }
      ],
      rotate: [
        { value: 360, duration: 700, elasticity: 100 },
        { value: -360, delay: 300, duration: 700, elasticity: 100 }
      ]
    });
    expect(mockClearTimeoutFn).toHaveBeenCalledTimes(1);
    expect(mockSetTimeoutFn).toHaveBeenCalledTimes(2);

    // Making the fourth call to test the getElementById will not be called again.
    animateOrderNumber();
    expect(mockGetElementByIdFn).toHaveBeenCalledTimes(3);
  });
});
