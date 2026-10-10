
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

    console.log('2. Clica em forms...');
    await driver.findElement(By.css('a[href="/forms"]')).click();
    
    console.log('3. Clica em practice form...');
    await driver.findElement(By.css('a[href="/automation-practice-form"]')).click();

    // Preencher os campos
    console.log('4. Preenchendo o primeiro nome...');
    await driver.findElement(By.id('firstName'))
      .sendKeys('Aluizio');
    
    console.log('5. Preenchendo o sobrenome...');
    await driver.findElement(By.id('lastName'))
      .sendKeys('Nicodemos');

    console.log('6. Preenchendo o email...');
    await driver.findElement(By.id('userEmail'))
      .sendKeys('aluizio@teste.com');

    console.log('7. Selecionando o gênero...');
    await driver.findElement(By.css('label[for="gender-radio-1"]')).click();

    console.log('8. Preenchendo o número de telefone...');
    await driver.findElement(By.id('userNumber'))
      .sendKeys('8199126363');

    console.log('9. Preenchendo a data de nascimento...');
    await driver.findElement(By.id('dateOfBirthInput'))
      .sendKeys('10/09/2026');

    console.log('10. Preenchendo os assuntos...');
    await driver.findElement(By.id('subjectsInput'))
      .sendKeys('Teste');

    console.log('11. Selecionando os hobbies...');
    await driver.findElement(By.id('hobbies-checkbox-1')).click();

    await driver.findElement(By.id('hobbies-checkbox-2')).click();

    await driver.findElement(By.id('hobbies-checkbox-3')).click();

    console.log('12. Fazendo upload da imagem...');
    const path = require('node:path');

    await driver.findElement(By.id('uploadPicture')).sendKeys(path.resolve(__dirname, 'teste.txt'));

    console.log('13. Preenchendo o endereço atual...');
    await driver.findElement(By.id('currentAddress'))
      .sendKeys('Joao Pessoa');

    console.log('14. Selecionando o estado...');
    const state = await driver.findElement(By.css('#state input'));
    await state.sendKeys('NCR', '\uE007'); // Enter

    console.log('15. Selecionando a cidade...');
    const city = await driver.findElement(By.css('#city input'));
    await city.sendKeys('Delhi', '\uE007'); // Enter

    
    console.log('16. apertar no botao...');
    const button = await driver.findElement(By.id('submit'));

    await driver.executeScript(
      'arguments[0].scrollIntoView({block: "center"});',
      button
    );

    await driver.executeScript(
  'arguments[0].click();',
  button
);


    
    console.log('17. Validando o popup...');


    const tituloPopup = await driver.wait(
      until.elementLocated(By.id('example-modal-sizes-title-lg')),
      10000
    );

    await driver.wait(until.elementIsVisible(tituloPopup), 10000);

    const titulo = await tituloPopup.getText();

    assert.equal(
      titulo,
      'Thanks for submitting the form',
      'O título do popup está incorreto'
    );

    console.log('Popup validado com sucesso!');

    
    console.log('18. Fechando o popup...');

    const fecharPopup = await driver.findElement(
      By.id('closeLargeModal')
    );

    await fecharPopup.click();

    console.log('Popup fechado com sucesso!');
   

   
  });
});