import mysql from 'mysql2/promise';

import { connectionSettings } from '../settings';

export default async () => {
  const conn = await mysql.createConnection(connectionSettings);
  // Table 1
  try {
    await conn.execute(`
        SELECT *
        FROM formula_series
      `);
  } catch (error) {
    // If table does not exist, create it
    if (error.errno === 1146) {
      console.log('Initializing table: formula_series');
      await conn.execute(`
        CREATE TABLE formula_series (
          formula_id INT,
          PRIMARY KEY (formula_id)
        )
      `);
      console.log('...success!');
    }
  }
  try {
    await conn.execute(`
        INSERT INTO formula_series (formula_id)
        VALUES (1)
      `);
  } catch (error) {
    // Catch the error
      console.log('...failed to insert!');
  }
  // Table 2
  try {
    await conn.execute(`
        SELECT *
        FROM drivers
      `);
  } catch (error) {
    // If table does not exist, create it
    if (error.errno === 1146) {
      console.log('Initializing table: drivers');
      await conn.execute(`
        CREATE TABLE drivers (
          driver_id INT,
          formula_id INT,
          driver_name VARCHAR(255),
          PRIMARY KEY (driver_id),
          FOREIGN KEY (formula_id) REFERENCES formula_series(formula_id)
        )
      `);
      console.log('...success!');
    }
  }
  try {
    await conn.execute(`
        INSERT INTO drivers (driver_id, formula_id, driver_name)
        VALUES (77, 1, 'Bottas, V')
      `);
  } catch (error) {
    // Catch the error
      console.log('...failed to insert!');
  }
    // Table 3
    try {
      await conn.execute(`
          SELECT *
          FROM teams
        `);
    } catch (error) {
      // If table does not exist, create it
      if (error.errno === 1146) {
        console.log('Initializing table: teams');
        await conn.execute(`
          CREATE TABLE teams (
            driver_id INT,
            driver_team VARCHAR(255),
            FOREIGN KEY (driver_id) REFERENCES drivers(driver_id)
          )
        `);
        console.log('...success!');
      }
    }
    try {
      await conn.execute(`
          INSERT INTO teams (driver_id, driver_team)
          VALUES (77, 'Mercedes')
        `);
    } catch (error) {
      // Catch the error
        console.log('...failed to insert!');
    }
};
