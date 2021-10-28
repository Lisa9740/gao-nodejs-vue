const { exec } = require('child_process');

// Erase database
const erase = exec("node_modules/.bin/sequelize db:migrate:undo:all", (error, stdout, stderr) => {
    console.log(`Erasing database...`);
});


// Run migrations
const migrate = () => exec("node_modules/.bin/sequelize db:migrate", (error, stdout, stderr) => {
    console.log(`Running our migrations...`);
});


// Setting our seeds
const seeds = () => exec("node_modules/.bin/sequelize db:seed:all", (error, stdout, stderr) => {
    console.log(`Setting our seeds...`);
});

// Handle the order
erase.on('close', () => {
    const isMigrateDone = migrate();
    isMigrateDone.on('close', () =>{
        const finished = seeds();
        finished.on('close', () => {
            console.log('Finished !')
        })
    })
});
