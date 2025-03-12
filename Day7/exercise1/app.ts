// use for testing
import Names from './Names';

(async () => {
  // Add new names
  await Names.addName('Eve');
  const x = await Names.getAll();
  console.log('data.json content:', x);

  // Get all names
  const names = await Names.getNames();
  console.log(names);

  // Get name by ID
  const name = await Names.getNameById("1");
  const name2 = await Names.getNameById("UBW60tgxhhbzWTohYuYPo");
  console.log(name, "name");
  console.log(name2, "name2");

  // Update name by ID
  await Names.updateNameById("UBW60tgxhhsdfdsvbzWTohYuYPo", "Alice");
  const y = await Names.getAll();
  console.log('data.json content:', y);

  // Delete name by ID
  await Names.deleteNameById("UBW60tgxhhbzWTohYuYPo");
  const z = await Names.getAll();
  console.log('data.json content:', z);
})();
