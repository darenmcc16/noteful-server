module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    SSL:true,
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://tklqjdmfiziqdi:464df57cba46861c2a42fd5a59222df8f298fbe3ab4cbe432170e04b8c87226d@ec2-52-70-67-123.compute-1.amazonaws.com:5432/de9lrfo3hndgtj?ssl=true&sslmode=require',
    //DATABASE_URL: process.env.DATABASE_URL || 'postgres://dunder_mifflin:Whitesox1$@localhost:5432/noteful',
  }