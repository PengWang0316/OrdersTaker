import faker from 'faker';
import puppeteer from 'puppeteer';

const url = 'http://localhost:8080';

jest.setTimeout(16000);

describe('HomePage', () => {
  let browser;
  let page;
  const width = 1000;
  const height = 1080;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      // headless: false,
      // slowMo: 80
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
  });

  test('Element in the lg width', async () => {
    await page.goto(url);
    // Navbar element
    const navbar = await page.$eval('[data-testid="navbar"]', el => el ? true : false);
    const orderButton = await page.$eval('[data-testid="orderButton"]', el => el ? true : false);
    const menuButton = await page.$eval('[data-testid="menuButton"]', el => el ? true : false);
    const loginButton = await page.$eval('[data-testid="loginButton"]', el => el ? true : false);

    expect(navbar).toBe(true);
    expect(orderButton).toBe(true);
    expect(menuButton).toBe(true);
    expect(loginButton).toBe(true);
  });

  test('Elememts in the sm width', async () => {
    const override = Object.assign(page.viewport(), { width: 500 });
    await page.setViewport(override);
    await page.goto(url);
    const navbar = await page.$eval('[data-testid="navbar"]', el => el ? true : false);
    const navbarDropMenuButton = await page.$eval('[data-testid="navbarDropMenuButton"]', el => el ? true : false);
    await page.click('[data-testid="navbarDropMenuButton"]');
    const dropDownMenu = await page.$eval('[data-testid="dropDownMenu"]', el => el ? true : false);
    const orderLink = await page.$eval('[data-testid="orderLink"]', el => el ? true : false);
    const loginMenu = await page.$eval('[data-testid="loginMenu"]', el => el ? true : false);

    expect(navbar).toBe(true);
    expect(navbarDropMenuButton).toBe(true);
    expect(dropDownMenu).toBe(true);
    expect(orderLink).toBe(true);
    expect(loginMenu).toBe(true);
  });

  afterAll(() => browser.close());
});
