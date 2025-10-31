import { expect, Locator, Page } from "@playwright/test";
import { CountryInfo } from "../entities/CountryInfo";


export class TableCountryPage {

  private tableContainer: Locator;
  // create a variable to hold all the rows
  private rows: Locator;
  // Array to store all rows as Locator array
  private rowsArray: Promise<Locator[]>;

  constructor(page: Page) {
    this.tableContainer = page.locator("//table[@id='countries']");
    this.rows = this.tableContainer.locator("tr");
    // Initialize rowsArray in constructor
    this.rowsArray = this.rows.all();
  }

  // Method to get the information of every row in the table
  async getAllRowsInfo(): Promise<CountryInfo[]> {
    const rows = await this.rowsArray;
    const countriesInfo: CountryInfo[] = [];

    for (let row of rows) {
      let country = new CountryInfo(
        await row.locator('xpath=.//td[2]').innerText(),
        await row.locator('xpath=.//td[3]').innerText(),
        await row.locator('xpath=.//td[4]').innerText(),
        await row.locator('xpath=.//td[5]').innerText()
      );
      countriesInfo.push(country);
      console.log(country.toString());
    }
    return countriesInfo;
  }

  // Method to get the information of a specific row by its index
  async getRowInfoByIndex(index: number): Promise<CountryInfo | null> {
    const rows = await this.rowsArray;
    if (index < 0 || index >= rows.length) {
      return null;
    }
    const row = rows[index];
    const country = new CountryInfo(
      await row.locator('xpath=.//td[2]').innerText(),
      await row.locator('xpath=.//td[3]').innerText(),
      await row.locator('xpath=.//td[4]').innerText(),
      await row.locator('xpath=.//td[5]').innerText()
    );
    console.log(country.toString()); 
    return country;
  }

  // Metodo para obtener la información de una fila específica por el nombre del país
  async getRowInfoByCountryName(countryName: string): Promise<CountryInfo | null> {
    const rows = await this.rowsArray;
    for (let row of rows) {
      const country = await row.locator('xpath=.//td[2]').innerText();
      if (country === countryName) {
        const countryInfo = new CountryInfo(
          country,
          await row.locator('xpath=.//td[3]').innerText(),
          await row.locator('xpath=.//td[4]').innerText(),
          await row.locator('xpath=.//td[5]').innerText()
        );
        console.log(countryInfo.toString()); 
        return countryInfo;
      }
    }
    return null;
  }

  // Meodo para obtener la informacion filtrando por idioma
  async getRowsInfoByLanguage(language: string): Promise<CountryInfo[]> {
    const rows = await this.rowsArray;
    const filteredCountries: CountryInfo[] = [];        

    for (let row of rows) {
      const primaryLanguage = await row.locator('xpath=.//td[5]').innerText();
      if (primaryLanguage === language) {
        const countryInfo = new CountryInfo(
          await row.locator('xpath=.//td[2]').innerText(),
          await row.locator('xpath=.//td[3]').innerText(),
          await row.locator('xpath=.//td[4]').innerText(),
          primaryLanguage
        );
        filteredCountries.push(countryInfo);
        console.log(countryInfo.toString()); 
      }
    }
    return filteredCountries;
  }

  // Método para obtener el número de filas en la tabla
  async getNumberOfRows(): Promise<number> {
    const rowCount = await this.rows.count();  // Usar el método count() para obtener el número de filas
    console.log(`Number of rows in the table: ${rowCount}`);
    return rowCount;
  }
}   
