const mongoose = require('mongoose');
const dotenv = require('dotenv');
const openHours = require('./data/openHours');
const days = require('./data/days');
const OpenHour = require('./models/openHourModel');
const Day = require('./models/dayModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    // .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(conn => {
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  });

const importData = async () => {
  try {
    await OpenHour.deleteMany();
    await Day.deleteMany();

    const insertedHours = await OpenHour.insertMany(openHours);

    // Sunday - 9:00 AM to 10:00 PM
    for (let i = 9; i <= 22; i++) {
      days[0].openHours.push(insertedHours[i]._id);
    }
    // Monday - 9:00 AM to 8:00 PM
    for (let i = 9; i <= 20; i++) {
      days[1].openHours.push(insertedHours[i]._id);
    }
    // Tuesday - 10:00 AM to 9:00 PM
    for (let i = 10; i <= 21; i++) {
      days[2].openHours.push(insertedHours[i]._id);
    }
    // Wednesday - 9:00 AM to 10:00 PM
    for (let i = 9; i <= 22; i++) {
      days[3].openHours.push(insertedHours[i]._id);
    }
    // Thursday - 7:00 AM to 10:00 PM
    for (let i = 7; i <= 22; i++) {
      days[4].openHours.push(insertedHours[i]._id);
    }
    // Friday - 8:00 AM to 7:00 PM
    for (let i = 8; i <= 19; i++) {
      days[5].openHours.push(insertedHours[i]._id);
    }
    // Saturday - 9:00 AM to 10:00 PM
    for (let i = 9; i <= 22; i++) {
      days[6].openHours.push(insertedHours[i]._id);
    }

    await Day.insertMany(days);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await OpenHour.deleteMany();
    await Day.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  // run destroyData if 'node seeder.js -d'
  destroyData();
} else {
  importData();
}
