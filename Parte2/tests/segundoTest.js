
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('node:assert/strict');

describe('Accenture - Teste Nova Janela', function () {
  this.timeout(20000);

  let driver;
  let janelaOriginal;

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

  it('deve abrir uma nova janela, verificar o label e fechar', async function () {
    // Acessar a página
    console.log('1. Abrindo a página...');
    await driver.get('https://demoqa.com/');

    console.log('2. Clica em Alerts...');
    await driver.findElement(By.css('a[href="/alertsWindows"]')).click();
    
    console.log('3. Clica em Browser Windows...');
    await driver.findElement(By.css('a[href="/browser-windows"]')).click();

    janelaOriginal = await driver.getWindowHandle();

    console.log('4. Apertar botão New Window...');
    await driver.findElement(By.id('windowButton')).click();
    
    await driver.wait(async () => {
      const janelas = await driver.getAllWindowHandles();
      return janelas.length === 2;
    }, 10000);

    const janelas = await driver.getAllWindowHandles();
    const novaJanela = janelas.find(
      janela => janela !== janelaOriginal
    );

    assert.ok(novaJanela, 'A nova janela não foi encontrada');

    await driver.switchTo().window(novaJanela);

    console.log('5. Verificando a URL da nova janela...');

    const url = await driver.getCurrentUrl();
    console.log('URL aberta:', url);

    assert.ok(
      url.includes('/sample'),
      'A URL da nova janela não é a esperada'
    );

    // 8. Verificar o label/texto
    const label = await driver.wait(
      until.elementLocated(By.id('sampleHeading')),
      10000
    );

    const textoLabel = await label.getText();

    console.log('Texto encontrado:', textoLabel);

    assert.equal(
      textoLabel,
      'This is a sample page',
      'O texto da nova janela está incorreto'
    );

    console.log('6. Fechando a nova janela...');

    // 9. Fechar a nova janela
    await driver.close();

    // 10. Voltar para a janela original
    await driver.switchTo().window(janelaOriginal);

    assert.equal(
      await driver.getCurrentUrl(),
      'https://demoqa.com/browser-windows'
    );

    console.log('Teste concluído com sucesso!');
  });

  
});

    

   

   
