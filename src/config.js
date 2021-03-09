module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    SSL:true,
    //DATABASE_URL: process.env.DATABASE_URL || 'postgres://owuutryuiyqohe:a337065a1c8feb655303559be30e1d700591df2196d13612cec8d7b1fbd2f69e@ec2-18-204-74-74.compute-1.amazonaws.com:5432/djudlcjsp0ede',
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://dunder_mifflin:Whitesox1$@localhost:5432/noteful',
  }