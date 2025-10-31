import  { test, expect } from '@playwright/test';
import { TableCountryPage } from '../main/pageObject/TableCountryPage';

test.skip('Test Web Table', async ({ page }) => {

  await page.goto('https://cosmocode.io/automation-practice-webtable/');

  // TableContainer is a locator for the table with id 'countries'
  const TableContainer = await page.locator("//table[@id='countries']");

  // Get all rows from the table
   const rows = await TableContainer.locator('xpath=.//tr').all();

    // Forma antigua (concatenación)
  //console.log('Number of rows in the table: ' + rows.length);
  console.log(`Number of rows in the table: ${rows.length}`);

   const countriesInfo: CountryInfo[] = [];

  for (let row of rows) {
    // poner un salto de línea entre cada fila
 //   console.log(await row.innerText() + '\n');
    let country: CountryInfo = {
        country: await row.locator('xpath=.//td[2]').innerText(),
        capital: await row.locator('xpath=.//td[3]').innerText(),
        currency: await row.locator('xpath=.//td[4]').innerText(),
        primaryLanguage: await row.locator('xpath=.//td[5]').innerText(),
    }
    countriesInfo.push(country); 
  } 

  // print all countries info
  for(const country of countriesInfo) {
    console.log(`Country: ${country.country}, Capital: ${country.capital}, Currency: ${country.currency}, Primary Language: ${country.primaryLanguage}`);
  } 
 
  // filter countries where primary language is Russian
    const specificSpeakingCountries = countriesInfo.filter(country => country.primaryLanguage.includes('Russian'));
    console.log('Countries where primary language is Russian:');
    for (const info of specificSpeakingCountries) {
        console.log(`Country: ${info.country}, Capital: ${info.capital}, Currency: ${info.currency}, Primary Language: ${info.primaryLanguage}`);
    } 

    // Get info from a specific row (e.g., row 1)
  const row1 = rows.at(1);
  const country = await row1?.locator('xpath=.//td[2]').innerText();
  const capital = await row1?.locator('xpath=.//td[3]').innerText();
  const currency = await row1?.locator('xpath=.//td[4]').innerText();
  console.log(`Country: ${country}, Capital: ${capital}, Currency: ${currency}`);

});

interface CountryInfo {
    country: string;
    capital: string;
    currency: string;
    primaryLanguage: string;
}   


test('Test Web Table List', async ({ page }) => {
  await page.goto('https://cosmocode.io/automation-practice-webtable/');
  const tableCountry = new TableCountryPage(page);
 // const rows =  await tableCountry.getAllRows();
 // await expect(rows.length).toBeGreaterThan(0);
 // await tableCountry.getAllRowsInfo();
 // await tableCountry.getRowInfoByIndex(5);
  await tableCountry.getRowInfoByCountryName('Germany');
 // await tableCountry.getRowsInfoByLanguage('Spanish');
   await tableCountry.getNumberOfRows();

  });