require('dotenv').config(); // Load environment variables
const express = require('express');
const app = express();
const { UserModel, ItemModel, LoanModel } = require('./config/database');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const passport = require('passport');
const mongoose = require('mongoose');


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL_PASSPORT_GOOGLE, collectionName: "sessions" }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

require('./config/passport');

app.use(passport.initialize())
app.use(passport.session())

// check user role
const requireRole = (role) => {
    return (req, res, next) => {
      if (!req.isAuthenticated()) {
        return res.status(401).send({ msg: "Unauthorized" });
      }
      if (req.user.role !== role) {
        return res.status(403).send({ msg: "Forbidden: Insufficient permissions" });
      }
      next();
    };
  };
  
  // allow multiple roles
  const requireRoles = (roles) => {
    return (req, res, next) => {
      if (!req.isAuthenticated()) {
        return res.status(401).send({ msg: "Unauthorized" });
      }
      if (!roles.includes(req.user.role)) {
        return res.status(403).send({ msg: "Forbidden: Insufficient permissions" });
      }
      next();
    };
  };
  

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
app.post('/add-item', requireRole('admin') ,async (req, res) => {
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

// Add a loaned item
app.post('/add-loan/', async (req, res) => {
    const { userId, itemId, status, location } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).send({ error: 'Invalid userId or itemId' });
        }
        const newLoan = new LoanModel({
            userId,
            itemId,
            status,
            location,
        });
        await newLoan.save();
        res.status(201).send({ message: 'Loan added successfully', loan: newLoan });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Get all loaned items
app.get('/loaned-items/', requireRoles(['staff', 'admin']) ,async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).send({ error: 'Invalid itemId' });
        }
        const items = await LoanModel.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Update a loaned item by item ID
app.put('/update-loan/:itemId', async (req, res) => {
    const itemId = req.params.itemId;
    try {
        const updatedLoan = await LoanModel.findOneAndUpdate(
            { itemId },
            req.body,
            { new: true }
        );
        if (!updatedLoan) {
            return res.status(404).send({ error: 'Loan not found' });
        }
        res.status(200).send({ message: 'Loan updated successfully', loan: updatedLoan });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Delete a loan by item ID
app.delete('/delete-loan/:itemId', async (req, res) => {
    const itemId = req.params.itemId;
    try {
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).send({ error: 'Invalid itemId' });
        }
        const deletedLoan = await LoanModel.findOneAndDelete({ itemId });
        if (!deletedLoan) {
            return res.status(404).send({ error: 'Loan not found' });
        }
        res.status(200).send({ message: 'Loan deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Add an item to the user's cart
app.post('/add-to-cart/:itemId', async (req, res) => {
    const itemId = req.params.itemId;
    if (!req.isAuthenticated()) {
        return res.status(401).send({ msg: "Unauthorized" });
    }

    try {
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).send({ error: 'Invalid itemId' });
        }
        const user = await UserModel.findById(req.user._id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        const item = await ItemModel.findById(itemId);
        if (!item || item.status !== 'Available') {
            return res.status(400).send({ error: 'Item is not available' });
        }

        // Add item to cart
        user.cart.push(itemId);
        await user.save();

        res.status(200).send({ message: 'Item added to cart', cart: user.cart });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// View items in the user's cart
app.get('/view-cart', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send({ msg: "Unauthorized" });
    }

    try {
        const user = await UserModel.findById(req.user._id).populate('cart');
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.status(200).send({ cart: user.cart });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Remove an item from the user's cart
app.delete('/remove-from-cart/:itemId', async (req, res) => {
    const itemId = req.params.itemId;
    if (!req.isAuthenticated()) {
        return res.status(401).send({ msg: "Unauthorized" });
    }

    try {
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).send({ error: 'Invalid itemId' });
        }
        
        const user = await UserModel.findById(req.user._id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        user.cart = user.cart.filter(item => item.toString() !== itemId);
        await user.save();

        res.status(200).send({ message: 'Item removed from cart', cart: user.cart });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Checkout the user's cart
app.post('/checkout-cart', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send({ msg: "Unauthorized" });
    }

    try {
        const user = await UserModel.findById(req.user._id).populate('cart');
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        for (const item of user.cart) {
            if (item.status !== 'Available') {
                return res.status(400).send({ error: `Item ${item.assetId} is no longer available` });
            }
        }

        // Create loan records and update item status
        for (const item of user.cart) {
            item.status = 'Assigned To Location';
            await item.save();

            const newLoan = new LoanModel({
                userId: user._id,
                itemId: item._id,
                status: 'Assigned to Location',
                location: 'N/A'
            });
            await newLoan.save();
        }

        // Clear the user's cart
        user.cart = [];
        await user.save();

        res.status(200).send({ message: 'Checkout successful' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Manage user roles
app.put('/assign-role/:userId', requireRole('admin'), async (req, res) => {
    const userId = req.params.userId;
    const { role } = req.body;

    if (!['user', 'staff', 'admin'].includes(role)) {
        return res.status(400).send({ error: 'Invalid role' });
    }

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { role },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.status(200).send({ message: `User role updated to ${role}`, user: updatedUser });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// User management page
app.get('/manage-users', requireRole('admin'), async (req, res) => {
    try {
        const users = await UserModel.find(); // Fetch all users
        res.render('manage-users', { users });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(3000, (req, res) => {
    console.log("Listening to port 3000");
})