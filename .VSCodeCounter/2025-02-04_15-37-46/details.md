# Details

Date : 2025-02-04 15:37:46

Directory /Users/emilioortiz/GitHub/class-tech-loan

Total : 69 files,  13448 codes, 885 comments, 481 blanks, all 14814 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [README.md](/README.md) | Markdown | 118 | 0 | 21 | 139 |
| [app.js](/app.js) | JavaScript | 50 | 27 | 14 | 91 |
| [class-tech-loan.code-workspace](/class-tech-loan.code-workspace) | JSON with Comments | 39 | 4 | 1 | 44 |
| [config/config.js](/config/config.js) | JavaScript | 23 | 28 | 9 | 60 |
| [config/database.js](/config/database.js) | JavaScript | 18 | 9 | 6 | 33 |
| [config/expressMiddleware.js](/config/expressMiddleware.js) | JavaScript | 29 | 12 | 8 | 49 |
| [config/passport.js](/config/passport.js) | JavaScript | 39 | 9 | 7 | 55 |
| [controllers/cartController.js](/controllers/cartController.js) | JavaScript | 113 | 16 | 17 | 146 |
| [controllers/googleController.js](/controllers/googleController.js) | JavaScript | 19 | 12 | 6 | 37 |
| [controllers/itemController.js](/controllers/itemController.js) | JavaScript | 99 | 23 | 13 | 135 |
| [controllers/loanController.js](/controllers/loanController.js) | JavaScript | 78 | 20 | 7 | 105 |
| [controllers/userController.js](/controllers/userController.js) | JavaScript | 135 | 23 | 17 | 175 |
| [middleware/auth.js](/middleware/auth.js) | JavaScript | 33 | 47 | 13 | 93 |
| [middleware/errorHandler.js](/middleware/errorHandler.js) | JavaScript | 7 | 23 | 4 | 34 |
| [middleware/shuffle.js](/middleware/shuffle.js) | JavaScript | 7 | 0 | 2 | 9 |
| [middleware/validateObjectId.js](/middleware/validateObjectId.js) | JavaScript | 13 | 4 | 3 | 20 |
| [models/Item.js](/models/Item.js) | JavaScript | 51 | 1 | 4 | 56 |
| [models/Loan.js](/models/Loan.js) | JavaScript | 32 | 2 | 5 | 39 |
| [models/User.js](/models/User.js) | JavaScript | 25 | 1 | 4 | 30 |
| [package-lock.json](/package-lock.json) | JSON | 10,736 | 0 | 1 | 10,737 |
| [package.json](/package.json) | JSON | 38 | 0 | 1 | 39 |
| [public/css/404.css](/public/css/404.css) | CSS | 32 | 31 | 7 | 70 |
| [public/css/adminPage.css](/public/css/adminPage.css) | CSS | 141 | 14 | 29 | 184 |
| [public/css/button.css](/public/css/button.css) | CSS | 83 | 9 | 17 | 109 |
| [public/css/cart.css](/public/css/cart.css) | CSS | 86 | 67 | 18 | 171 |
| [public/css/checkout.css](/public/css/checkout.css) | CSS | 33 | 37 | 8 | 78 |
| [public/css/dashboard.css](/public/css/dashboard.css) | CSS | 30 | 0 | 8 | 38 |
| [public/css/home.css](/public/css/home.css) | CSS | 110 | 65 | 16 | 191 |
| [public/css/instructions.css](/public/css/instructions.css) | CSS | 39 | 1 | 6 | 46 |
| [public/css/itemCard.css](/public/css/itemCard.css) | CSS | 35 | 0 | 6 | 41 |
| [public/css/itemDetails.css](/public/css/itemDetails.css) | CSS | 17 | 0 | 4 | 21 |
| [public/css/itemDetailsPage.css](/public/css/itemDetailsPage.css) | CSS | 21 | 0 | 4 | 25 |
| [public/css/itemGrid.css](/public/css/itemGrid.css) | CSS | 13 | 0 | 2 | 15 |
| [public/css/navbar.css](/public/css/navbar.css) | CSS | 131 | 16 | 24 | 171 |
| [public/css/productImage.css](/public/css/productImage.css) | CSS | 6 | 0 | 2 | 8 |
| [public/css/styles.css](/public/css/styles.css) | CSS | 83 | 8 | 19 | 110 |
| [public/css/timePicker.css](/public/css/timePicker.css) | CSS | 21 | 4 | 4 | 29 |
| [public/images/UMassBoston-Logo/Black-logo-lockup/Black-UMB-logo-lockup.svg](/public/images/UMassBoston-Logo/Black-logo-lockup/Black-UMB-logo-lockup.svg) | XML | 1 | 0 | 0 | 1 |
| [public/images/UMassBoston-Logo/Blue-logo-lockup/Blue-UMB-logo-lockup.svg](/public/images/UMassBoston-Logo/Blue-logo-lockup/Blue-UMB-logo-lockup.svg) | XML | 1 | 0 | 0 | 1 |
| [public/images/UMassBoston-Logo/white-logo-lockup/White-UMB-logo-lockup.svg](/public/images/UMassBoston-Logo/white-logo-lockup/White-UMB-logo-lockup.svg) | XML | 1 | 0 | 0 | 1 |
| [public/js/scripts.js](/public/js/scripts.js) | JavaScript | 0 | 10 | 1 | 11 |
| [routes/cartRoutes.js](/routes/cartRoutes.js) | JavaScript | 21 | 14 | 8 | 43 |
| [routes/googleRoutes.js](/routes/googleRoutes.js) | JavaScript | 7 | 12 | 6 | 25 |
| [routes/itemRoutes.js](/routes/itemRoutes.js) | JavaScript | 16 | 23 | 8 | 47 |
| [routes/loanRoutes.js](/routes/loanRoutes.js) | JavaScript | 28 | 37 | 9 | 74 |
| [routes/userRoutes.js](/routes/userRoutes.js) | JavaScript | 34 | 41 | 11 | 86 |
| [start.js](/start.js) | JavaScript | 5 | 0 | 2 | 7 |
| [tests/integration/cartRoutes.test.js](/tests/integration/cartRoutes.test.js) | JavaScript | 0 | 0 | 1 | 1 |
| [tests/integration/googleRoutes.test.js](/tests/integration/googleRoutes.test.js) | JavaScript | 0 | 0 | 1 | 1 |
| [tests/integration/itemRoutes.test.js](/tests/integration/itemRoutes.test.js) | JavaScript | 0 | 0 | 1 | 1 |
| [tests/integration/loanRoutes.test.js](/tests/integration/loanRoutes.test.js) | JavaScript | 0 | 0 | 1 | 1 |
| [tests/integration/userRoutes.test.js](/tests/integration/userRoutes.test.js) | JavaScript | 0 | 0 | 1 | 1 |
| [tests/setup.js](/tests/setup.js) | JavaScript | 0 | 0 | 1 | 1 |
| [views/404.jsx](/views/404.jsx) | JavaScript JSX | 29 | 28 | 7 | 64 |
| [views/admin.jsx](/views/admin.jsx) | JavaScript JSX | 118 | 4 | 8 | 130 |
| [views/cart.jsx](/views/cart.jsx) | JavaScript JSX | 67 | 30 | 9 | 106 |
| [views/checkout.jsx](/views/checkout.jsx) | JavaScript JSX | 35 | 29 | 7 | 71 |
| [views/components/Buttons.jsx](/views/components/Buttons.jsx) | JavaScript JSX | 108 | 14 | 10 | 132 |
| [views/components/Chart.jsx](/views/components/Chart.jsx) | JavaScript JSX | 48 | 4 | 5 | 57 |
| [views/components/ItemCard.jsx](/views/components/ItemCard.jsx) | JavaScript JSX | 26 | 0 | 3 | 29 |
| [views/components/ItemDetails.jsx](/views/components/ItemDetails.jsx) | JavaScript JSX | 33 | 32 | 6 | 71 |
| [views/components/Navbar.jsx](/views/components/Navbar.jsx) | JavaScript JSX | 69 | 0 | 5 | 74 |
| [views/components/ProductImage.jsx](/views/components/ProductImage.jsx) | JavaScript JSX | 14 | 30 | 4 | 48 |
| [views/components/Sidebar.jsx](/views/components/Sidebar.jsx) | JavaScript JSX | 22 | 1 | 3 | 26 |
| [views/components/TimePicker.jsx](/views/components/TimePicker.jsx) | JavaScript JSX | 17 | 14 | 4 | 35 |
| [views/components/itemGrid.jsx](/views/components/itemGrid.jsx) | JavaScript JSX | 25 | 0 | 4 | 29 |
| [views/dashboard.jsx](/views/dashboard.jsx) | JavaScript JSX | 35 | 12 | 3 | 50 |
| [views/home.jsx](/views/home.jsx) | JavaScript JSX | 57 | 32 | 8 | 97 |
| [views/item.jsx](/views/item.jsx) | JavaScript JSX | 48 | 5 | 7 | 60 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)