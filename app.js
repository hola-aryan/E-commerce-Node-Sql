const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// (async () => {
//   try {
//     const result = await db.execute('SELECT * FROM products');
//     console.log(result[0],result[1]);
//   } catch (error) {
//     console.error('Error executing database query:', error);
//   }
// })();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize.sync()
.then(result=>{console.log(result)})
.catch(err=>console.log(err))

app.listen(3000);
