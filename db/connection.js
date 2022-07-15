const debug = require('debug')('sql'); // debugging tool
const Sequelize = require('sequelize'); // postgresql ORM

// Get credentials from the env file
const { postgres_DB_ADDRESS, postgres_DB_PORT, postgres_DB_NAME, postgres_DB_USER, postgres_DB_PASSWORD } = process.env;

// Generate url for postgres connection
const purl = `postgres://${postgres_DB_USER}:${postgres_DB_PASSWORD}@${postgres_DB_ADDRESS}:${postgres_DB_PORT}/${postgres_DB_NAME}`;

const postgres = new Sequelize(purl, {
  logging: debug, // export DEBUG=sql in the environment to get SQL queries
  define: {
    underscored: true,       // use snake_case rather than camelCase column names
    freezeTableName: true,   // don't change table names from the one specified
    timestamps: true,        // automatically include timestamp columns
  }
});

// Authenticate and synchronize the postgres db
postgres.authenticate()
  .then(() => console.log(`Postgres is connected successfully at: `, new Date()))
  .catch(err => console.log(`unable to connect to postgres!`, err.message));
postgres.sync({ force: false })
  // .then(() => console.log(`synced ${db.config.database} successfully!`))
  .catch(err => console.log(`unable to sync postgres!`, err.message));

module.exports = postgres;