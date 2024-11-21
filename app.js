const { hashSync } = require('bcrypt');
const express = require('express');
const app = express();
const { UserModel, ItemModel } = require('./config/database');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const passport = require('passport');

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/passport-google', collectionName: "sessions" }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

require('./config/passport');

app.use(passport.initialize())
app.use(passport.session())

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/callback',
    passport.authenticate('google', { failureRedirect: '/login', successRedirect: '/protected' }));


    app.get('/logout', (req, res, next) => {
        req.logout((err) => {
            if (err) {
                return next(err); // If an error occurs, pass it to the next middleware (error handler)
            }
            res.redirect('/login'); // Redirect to login after successful logout
        });
    });
    

app.get('/protected', (req, res) => {
    if (req.isAuthenticated()) {
        res.render("protected", {
            name: req.user.name
        })
    } else {
        res.status(401).send({ msg: "Unauthorized" })
    }
    console.log(req.session)
    console.log(req.user)
})

// Add a new item
app.post('/add-item', async (req, res) => {
    const { assetId, assetType, make, model, status } = req.body;
    try {
        const newItem = new ItemModel({
            assetId,
            assetType,
            make,
            model,
            status,
        });
        await newItem.save();
        res.status(201).send({ message: 'Item added successfully', item: newItem });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Get all items
app.get('/items', async (req, res) => {
    try {
        const items = await ItemModel.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Update an item by asset ID
app.put('/update-item/:assetId', async (req, res) => {
    const assetId = req.params.assetId;
    try {
        const updatedItem = await ItemModel.findOneAndUpdate(
            { assetId },
            req.body,
            { new: true }
        );
        if (!updatedItem) {
            return res.status(404).send({ error: 'Item not found' });
        }
        res.status(200).send({ message: 'Item updated successfully', item: updatedItem });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Delete an item by asset ID
app.delete('/delete-item/:assetId', async (req, res) => {
    const assetId = req.params.assetId;
    try {
        const deletedItem = await ItemModel.findOneAndDelete({ assetId });
        if (!deletedItem) {
            return res.status(404).send({ error: 'Item not found' });
        }
        res.status(200).send({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(3000, (req, res) => {
    console.log("Listening to port 3000");
})