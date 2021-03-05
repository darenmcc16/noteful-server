module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    SSL:true,
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://dunder_mifflin@localhost/noteful',
    //DATABASE_URL: process.env.DATABASE_URL || 'postgres://dunder_mifflin:Whitesox1$@localhost:5432/noteful',
  }