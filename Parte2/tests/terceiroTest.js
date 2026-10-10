
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

    console.log('2. Clica em elements...');
    await driver.findElement(By.css('a[href="/elements"]')).click();
    
    console.log('3. Clica em web tables...');
    await driver.findElement(By.css('a[href="/webtables"]')).click();

    console.log('4. Clica em add new record...');
    await driver.findElement(By.id('addNewRecordButton')).click();

    // Preencher os campos
    console.log('5. Preenchendo o primeiro nome...');
    await driver.findElement(By.id('firstName'))
      .sendKeys('Aluizio');
    
    console.log('6. Preenchendo o sobrenome...');
    await driver.findElement(By.id('lastName'))
      .sendKeys('Nicodemos');

    console.log('7. Preenchendo o email...');
    await driver.findElement(By.id('userEmail'))
      .sendKeys('aluizio@teste.com');

    console.log('8. Preenchendo idade...');
    await driver.findElement(By.id('age'))
      .sendKeys('45');

    console.log('9. Preenchendo o salário...');
    await driver.findElement(By.id('salary'))
      .sendKeys('10000');

    console.log('10. Preenchendo o departamento...');
    await driver.findElement(By.id('department'))
      .sendKeys('Teste');

    console.log('11. apertar no botao...');
    const button = await driver.findElement(By.id('submit'));

    await driver.executeScript(
      'arguments[0].scrollIntoView({block: "center"});',
      button
    );

    await driver.executeScript(
  'arguments[0].click();',
  button
);

console.log('4. Clica em delete...');
    await driver.findElement(By.id('delete-record-4')).click();
    
    
   

   
  });
});