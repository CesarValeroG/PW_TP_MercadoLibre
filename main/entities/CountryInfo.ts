export class CountryInfo {
    // Public properties - direct access, no getters/setters needed
    public country: string;
    public capital: string;
    public currency: string;
    public primaryLanguage: string;

    // Constructor with default empty values
    constructor(
        country: string = '',
        capital: string = '',
        currency: string = '',
        primaryLanguage: string = ''
    ) {
        this.country = country;
        this.capital = capital;
        this.currency = currency;
        this.primaryLanguage = primaryLanguage;
    }

    // Static factory method for creating instances
    static create(country: string, capital: string, currency: string, primaryLanguage: string): CountryInfo {
        return new CountryInfo(country, capital, currency, primaryLanguage);
    }

    // toString() method like in Java
    toString(): string {
        return `{ Country='${this.country}', Capital='${this.capital}', Currency='${this.currency}',
             Primary Language='${this.primaryLanguage}'}\n`;
    }

    // equals() method like in Java - validates if two CountryInfo objects are equal by comparing their properties
    equals(other: CountryInfo): boolean {
        if (!other) return false;
        return this.country === other.country &&
               this.capital === other.capital &&
               this.currency === other.currency &&
               this.primaryLanguage === other.primaryLanguage;
    }

    // Method to validate if the object is complete (all fields have values)
    isValid(): boolean {
        return this.country !== '' && 
               this.capital !== '' && 
               this.currency !== '' && 
               this.primaryLanguage !== '';
    }

    // Method to reset all values to empty strings
    reset(): void {
        this.country = '';
        this.capital = '';
        this.currency = '';
        this.primaryLanguage = '';
    }
}
