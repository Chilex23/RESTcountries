import axios from "axios";

export default class SearchCountry {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const res = await axios(
        `https://restcountries.com/v3.1/name/${this.query}`
      );
      this.result = res.data;
      console.log(this.result);
    } catch (error) {
      alert("Error processing search query");
    }
  }
}
