const express = require('express');
require('dotenv').config(); // Load environment variables
const app = express();
const { UserModel, ItemModel, LoanModel } = require('./config/database');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const passport = require('passport');
const mongoose = require('mongoose');

const methodOverride = require('method-override');

app.use(express.static('public'));

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(methodOverride('_method'));
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
    res.render('loginJSX')
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
    

app.get('/protected', async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const items = await ItemModel.find();
            res.render("protectedJSX", {
                name: req.user.name,
                items,
            });
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
    } else {
        res.status(401).send({ msg: "Unauthorized" });
     }
    });    

app.get('/cart', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send({ msg: "Unauthorized" });
    }

    try {
        const user = await UserModel.findById(req.user._id).populate('cart');
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.render('cartJSX', {
            cartItems: user.cart,
            handleDelete: (itemId) => `/remove-from-cart/${itemId}`,
            handleCheckout: '/checkout-cart',
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Add a new item
app.post('/add-item', requireRole('admin'), async (req, res) => {
    const { assetId, assetType, make, model, status } = req.body;

    try {
        const newItem = new ItemModel({
            assetId,
            assetType,
            make,
            model,
            status: status || "Available", // Default to "Available" if not provided
        });

        await newItem.save();

        console.log(`Item added: ${newItem}`);

        // Redirect to the admin page after successful addition
        res.redirect('/admin');
    } catch (error) {
        console.error("Error adding item:", error);
        res.status(500).json({ error: "Failed to add item" });
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

app.get('/item/:itemId', async (req, res) => {
    try {
        const itemId = req.params.itemId;

        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).send({ error: 'Invalid itemId' });
        }

        const item = await ItemModel.findById(itemId);
        if (!item) {
            return res.status(404).send({ error: 'Item not found' });
        }

        res.render('itemJSX', { item });
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

// Delete an item by ID
app.delete('/delete-item/:id', requireRole('admin'), async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ObjectId" });
    }

    try {
        const deletedItem = await ItemModel.findByIdAndDelete(id);
        if (!deletedItem) {
            console.log(`Item not found for id: ${id}`);
            return res.status(404).json({ error: "Item not found" });
        }

        console.log(`Item deleted: ${deletedItem}`);

        // Check if the item still exists in the database
        const checkItem = await ItemModel.findById(id);
        if (checkItem) {
            console.error(`Item still exists after deletion: ${checkItem}`);
        } else {
            console.log(`Item successfully removed from database.`);
        }

        res.redirect('/admin'); // Redirect to the admin page
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ error: "Failed to delete item" });
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

    try {
        const user = await UserModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Remove the item from the cart
        user.cart = user.cart.filter((id) => id.toString() !== itemId);
        await user.save();

        console.log(`Item ${itemId} removed from cart`);
        res.redirect('/cart'); // Redirect back to the cart page
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ error: "Failed to remove item from cart" });
    }
});


// Checkout the user's cart
app.post('/checkout-cart', async (req, res) => {
    try {
        const user = await UserModel.findById(req.user._id).populate('cart');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        console.log(`Processing checkout for user: ${user._id}`);
        console.log(`Cart items: ${JSON.stringify(user.cart, null, 2)}`);

        // Process each item in the cart
        for (const item of user.cart) {
            const dbItem = await ItemModel.findById(item._id);
            if (!dbItem) {
                console.error(`Item not found in database: ${item._id}`);
                return res.status(404).json({ error: `Item ${item.assetId} not found` });
            }

            // Update item status
            dbItem.status = 'Loaned';
            await dbItem.save();
            console.log(`Item status updated to Loaned: ${dbItem.assetId}`);
        }

        // Clear the user's cart
        user.cart = [];
        await user.save();
        console.log("Cart cleared successfully");

        // Redirect to the checkout success page
        res.redirect('/checkout-success');
    } catch (error) {
        console.error("Error during checkout:", error);
        res.status(500).json({ error: "Failed to checkout cart" });
    }
});


app.get('/checkout-success', (req, res) => {
    res.render('checkoutSuccessJSX', {
        name: req.user ? req.user.name : 'Guest',
        message: 'Your items are ready for pickup!',
    });
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
app.get('/admin', requireRole('admin'), async (req, res) => {
    try {
        const users = await UserModel.find();
        const items = await ItemModel.find();
        res.render('adminJSX', { users, items });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(3000, (req, res) => {
    console.log("Listening to port 3000");
})