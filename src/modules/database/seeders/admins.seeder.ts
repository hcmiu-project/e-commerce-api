import bcrypt from 'bcrypt';
import { Database } from '@modules/database/core/database';
import { Seeder } from '@modules/database/core/seeder';

class AdminsSeeder extends Seeder {
  /**
   * Name of seeder.
   */
  protected seederName = 'admins';

  /**
   * Insert data to table.
   */
  protected async run() {
    await Database.table('admins').insert(
      // Column names
      ['name', 'email', 'password'],
      // Inserted data
      [
        ['Admin 01', 'admin01@gmail.com', bcrypt.hashSync('00001', 10)],
        ['Moderator 01', 'moderator01@gmail.com', bcrypt.hashSync('00001', 10)],
        ['Moderator 02', 'moderator02@gmail.com', bcrypt.hashSync('00002', 10)],
      ],
    );
  }
}

export default new AdminsSeeder();