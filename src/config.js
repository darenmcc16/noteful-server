module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    SSL:true,
    //DATABASE_URL: process.env.DATABASE_URL || 'postgres://joaenexzpevool:9d1ef4c83cd8aa788c8329cb14b6de8df5b690a61b965031172a7995b7fc144e@ec2-54-159-175-113.compute-1.amazonaws.com:5432/d9g4nikl2rm9fs',
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://postgres@localhost/noteful',
  }