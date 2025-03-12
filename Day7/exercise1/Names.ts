import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { nanoid } from 'nanoid'

export default class Names {
// private so it can not be accessed outside the class
// static so it is attached to the class itself and not the instance.
  private static data: Names[] = []; // Private static property
  private static readonly pathToFile = join(__dirname, 'data.json'); // File path
  name: string;
  id: any;

  constructor(name: string) {
    this.name = name;
    this.id = nanoid();
  }

  private static async loadData(): Promise<void> {
    try {
      // UTF-8 is an efficient encoding for text data. When reading and writing JSON files,
      // using UTF-8 ensures that characters are correctly encoded and decoded, especially
      // if the data contains any non-ASCII characters (like special characters, accents,
      // or non-Latin scripts).
      const fileContent = await readFile(this.pathToFile, 'utf-8');

      this.data = fileContent.trim() ? JSON.parse(fileContent) : [];
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      this.data = [];
    }
  }

  static async getAll(): Promise<Names[]> {
    await this.loadData();
    return this.data;
  }

  async persist(): Promise<void> {
    try {
      await Names.loadData();

      // Add the current instance to the data array
      // instance method, does not have "this" access to static variables. hence Names.data
      Names.data.push(this);

      // Write updated data back to file
      // null: No replacer function is used, so no filtering or transformation is applied.
      // 2: The number of spaces to use for indentation in the JSON data.
      await writeFile(Names.pathToFile, JSON.stringify(Names.data, null, 2), 'utf-8');

      console.log('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  // Add a new name and persist it
  static async addName(name: string): Promise<void> {
    const newName = new Names(name);
    await newName.persist();
  }

  static async getNames(): Promise<string[]> {
    await this.loadData();
    return Names.data.map(obj => obj.name);
  }

  static async getNameById(id: string): Promise<string> {
    await this.loadData();
    const person = Names.data.find(obj => obj.id === id);

    return person ? person.name : "Does not exist";
  }

  static async updateNameById(id: string, new_name: string): Promise<void> {
    try {
      await this.loadData();
    const person = Names.data.find(obj => obj.id === id);
    person ? person.name = new_name : console.log("Person not found");

    await writeFile(Names.pathToFile, JSON.stringify(Names.data, null, 2), 'utf-8');
    }
    catch (error) {
      console.error('Error updating data:', error);
    }
  }

  static async deleteNameById(id: string): Promise<void> {
    await this.loadData();

    Names.data = Names.data.filter(obj => obj.id !== id);
    await writeFile(Names.pathToFile, JSON.stringify(Names.data, null, 2), 'utf-8');
  }
}
