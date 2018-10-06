import faker from 'faker';
import puppeteer from 'puppeteer';

const url = 'http://localhost:8080';

jest.setTimeout(16000);

describe('HomePage E2E Testing', () => {
  let browser;
  let page;
  const width = 1000;
  const height = 1080;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      // headless: false,
      // slowMo: 180
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
  });

  test('Element in the lg width', async () => {
    await page.goto(url);
    // Navbar testing
    const navbar = await page.$eval('[data-testid="navbar"]', el => el || false);
    const titleLink = await page.$eval('[data-testid="titleLink"]', el => el || false);
    const orderButton = await page.$eval('[data-testid="orderButton"]', el => el || false);
    const menuButton = await page.$eval('[data-testid="menuButton"]', el => el || false);
    const loginButton = await page.$eval('[data-testid="loginButton"]', el => el || false);

    expect(navbar).not.toBe(false);
    expect(titleLink).not.toBe(false);
    expect(orderButton).not.toBe(false);
    expect(menuButton).not.toBe(false);
    expect(loginButton).not.toBe(false);

    // Banner image
    await page.waitForSelector('[data-testid="lgBannerImage"]', { visible: true });
    const bannerImage = await page.$eval('[data-testid="lgBannerImage"]', el => el || false);
    expect(bannerImage).not.toBe(false);
  });

  test('Clicking Login button', async () => {
    await page.goto(url);
    await page.click('[data-testid="loginButton"]');
    let loginPanelTitle = await page.$eval('[data-testid="loginPanelTitle"', el => el || false);
    expect(loginPanelTitle).not.toBe(false);

    await page.click('[data-testid="switchRegisterButton"]');
    const registerPanelTitle = await page.$eval('[data-testid="registerPanelTitle"]', el => el || false);
    expect(registerPanelTitle).not.toBe(false);

    loginPanelTitle = false; // Reseting the element for the future test.
    await page.click('[data-testid="switchLoginButton"]');
    loginPanelTitle = await page.$eval('[data-testid="loginPanelTitle"]', el => el || false);
    expect(loginPanelTitle).not.toBe(false);
  });

  test('Element in the xs width', async () => {
    const override = Object.assign(page.viewport(), { width: 500 });
    await page.setViewport(override);
    await page.goto(url);

    // Navbar testing
    const navbar = await page.$eval('[data-testid="navbar"]', el => el || false);
    const titleLink = await page.$eval('[data-testid="titleLink"]', el => el || false);
    const navbarDropMenuButton = await page.$eval('[data-testid="navbarDropMenuButton"]', el => el || false);
    await page.click('[data-testid="navbarDropMenuButton"]');
    const dropDownMenu = await page.$eval('[data-testid="dropDownMenu"]', el => el || false);
    const orderLink = await page.$eval('[data-testid="orderLink"]', el => el || false);
    const loginMenu = await page.$eval('[data-testid="loginMenu"]', el => el || false);

    expect(navbar).not.toBe(false);
    expect(titleLink).not.toBe(false);
    expect(navbarDropMenuButton).not.toBe(false);
    expect(dropDownMenu).not.toBe(false);
    expect(orderLink).not.toBe(false);
    expect(loginMenu).not.toBe(false);

    // Banner image testing
    await page.waitForSelector('[data-testid="xsBannerImage"]', { visible: true });
    const bannerImage = await page.$eval('[data-testid="xsBannerImage"]', el => el || false);
    expect(bannerImage).not.toBe(false);
  });

  afterAll(() => browser.close());
});
