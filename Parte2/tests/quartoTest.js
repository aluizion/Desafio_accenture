
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('node:assert/strict');

describe('Accenture - Teste Form', function () {
  this.timeout(20000);

  let driver;

  before(async function () {
    driver = await new Builder()
      .forBrowser('chrome')
      .build();
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('deve preencher o formulário', async function () {
    // Acessar a página
    console.log('1. Abrindo a página...');
    await driver.get('https://demoqa.com/');

    console.log('2. Clica em widgets...');
    await driver.findElement(By.css('a[href="/widgets"]')).click();
    
   console.log('3. Clica em Progress Bar...');

const menuProgressBar = await driver.wait(
  until.elementLocated(By.css('a[href="/progress-bar"]')),
  10000
);

await driver.executeScript(
  'arguments[0].click();',
  menuProgressBar
);

await driver.wait(until.urlContains('/progress-bar'), 1000);

    console.log('4. Clica em start stop button...');
    await driver.findElement(By.id('startStopButton')).click();

    console.log('Aguardando 5 segundos...');
await new Promise(resolve => setTimeout(resolve, 2500));

   console.log('5. Clica em start stop button...');
    await driver.findElement(By.id('startStopButton')).click();
   
console.log('Verificando se a barra parou antes de 25%...');

const progresso = await driver.findElement(
  By.css('#progressBar [role="progressbar"]')
);

const valor = Number(
  await progresso.getAttribute('aria-valuenow')
);

assert.ok(
  valor <= 25,
  `Falha: a barra parou em ${valor}%, mas deveria parar igual ou antes de 25%`
);

console.log(`Assertion passou! A barra parou em ${valor}%.`);

console.log('6. Clica em start stop button...');
    await driver.findElement(By.id('startStopButton')).click();

const progresso2 = await driver.findElement(
  By.css('#progressBar [role="progressbar"]')
);

let valor2 = 0;

for (let i = 0; i < 1000; i++) {
  valor2 = Number(
    await progresso2.getAttribute('aria-valuenow')
  );

  console.log(`Progresso atual: ${valor2}%`);

  if (valor2 === 100) {
    console.log('A barra chegou a 100%!');
    break;
  }

  await new Promise(resolve => setTimeout(resolve, 500));
}

assert.equal(valor2, 100, 'A barra não chegou a 100% dentro do tempo esperado');

console.log('7. Clica em reset...');
    await driver.findElement(By.id('resetButton')).click();
  });
});