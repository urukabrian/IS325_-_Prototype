import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('census');

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  occupation: string;
  province: string;
  district: string;
  date: string; // Consider using a Date type depending on your date format
  gender: string;
}

export interface HouseholdDetails {
  id: number;
  numberOfPersons: number;
  residenceType: string;
  houseHoldIncome: number;
}

export interface Address {
  id: number;
  street: string;
  city: string;
  province: number;
  zipCode: number;
}

export const initializeDB = async () => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS person (
      id INTEGER PRIMARY KEY NOT NULL,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      occupation TEXT NOT NULL,
      province TEXT NOT NULL,
      district TEXT NOT NULL,
      date TEXT NOT NULL,
      gender TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS household (
    id INTEGER PRIMARY KEY NOT NULL,
    householdNumber INTEGER NOT NULL,
    householdHead TEXT NOT NULL,
    householdMembers INTEGER NOT NULL,
    householdResidenceType TEXT NOT NULL,
    householdIncome TEXT NOT NULL,
    FOREIGN KEY (householdHead) REFERENCES person(id)
    );

    CREATE TABLE IF NOT EXISTS address(
    id INTEGER PRIMARY KEY NOT NULL,
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    province TEXT NOT NULL,
    zipCode NUMBER NOT NULL
    FOREIGN KEY (household) REFERENCES household(id)
    );

  `);
};

export const addPerson = async (firstName: string, lastName: string, phone: string, email: string, occupation: string, province: string, district: string, date: string, gender: string) => {
  try {
    const result = await db.runAsync('INSERT INTO person (firstName, lastName, phone, email, occupation, province, district, date, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', firstName, lastName, phone, email, occupation, province, district, date, gender);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding person:", error);
  }
};

export const updatePerson = async (id: number, firstName: string, lastName: string, phone: string, email: string, date: string, gender: string, occupation: string, province: string, district: string) => {
  try {
    await db.runAsync('UPDATE person SET firstName = ?, lastName = ?, phone = ?, email = ?, occupation = ?,  province = ?, district = ?, date = ?, gender = ? WHERE id = ?', firstName, lastName, phone, email, date, gender, occupation, province, district, id);
  } catch (error) {
    console.error("Error updating person:", error);
  }
};

export const deletePerson = async (id: number) => {
  try {
    await db.runAsync('DELETE FROM person WHERE id = ?', id);
  } catch (error) {
    console.error("Error deleting person:", error);
  }
};

export const getPersons = async () => {
  try {
    const allRows = await db.getAllAsync('SELECT * FROM person') as Person[];
    return allRows;
  } catch (error) {
    console.error("Error getting persons:", error);
    return [];
  }
};


export const addHousehold = async (numberOfPersons: number, residenceType: string, houseHoldIncome: number) => {
  try {
    const result = await db.runAsync('INSERT INTO household (numberOfPersons, residenceType, houseHOldIncome) VALUES (?, ?, ?)', numberOfPersons, residenceType, houseHoldIncome);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding household:", error);
  }
};

export const updateHousehold = async (id: number, numberOfPersons: number, residenceType: string, houseHoldIncome: number) => {
  try {
    await db.runAsync('UPDATE household SET numberOfPersons = ?, residenceType = ?, houseHoldIncome = ? WHERE id = ?',  numberOfPersons, residenceType, houseHoldIncome, id);
  } catch (error) {
    console.error("Error updating household:", error);
  }
};

export const deleteHousehold = async (id: number) => {
  try {
    await db.runAsync('DELETE FROM household WHERE id = ?', id);
  } catch (error) {
    console.error("Error deleting household:", error);
  }
};

export const getHouseholds = async () => {
  try {
    const allRows = await db.getAllAsync('SELECT * FROM household') as HouseholdDetails[];
    return allRows;
  } catch (error) {
    console.error("Error getting households:", error);
    return [];
  }
};


export const addAddress = async (id: number, street: string, city: string, zipCode: number) => {
  try {
    const result = await db.runAsync('INSERT INTO address (street, city, zipCode) VALUES (?, ?, ?)', street, city, zipCode);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding address:", error);
  }
};

export const updateAddress = async (id: number, street: string, city: string, zipCode: number) => {
  try {
    await db.runAsync('UPDATE address SET street = ?, city = ?, zipcode = ? WHERE id = ?', street, city, zipCode, id);
  } catch (error) {
    console.error("Error updating address:", error);
  }
};

export const deleteAddress = async (id: number) => {
  try {
    await db.runAsync('DELETE FROM address WHERE id = ?', id);
  } catch (error) {
    console.error("Error deleting address:", error);
  }
};

export const getAddresses = async () => {
  try {
    const allRows = await db.getAllAsync('SELECT * FROM address') as Address[];
    return allRows;
  } catch (error) {
    console.error("Error getting addresses:", error);
    return [];
  }
};

