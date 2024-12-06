const React = require('react');

const CartJSX = ({ cartItems }) => {
    return (
        <html>
            <head>
                <title>Cart</title>
            </head>
            <body>
                <h1>Your Cart</h1>

                {cartItems.length > 0 ? (
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item._id}>
                                <p>
                                    <strong>Asset Type:</strong> {item.assetType} <br />
                                    <strong>Asset ID:</strong> {item.assetId} <br />
                                    <strong>Make:</strong> {item.make} <br />
                                    <strong>Model:</strong> {item.model}
                                </p>
                                {/* Form to remove item from cart */}
                                <form action={`/remove-from-cart/${item._id}?_method=DELETE`} method="POST">
                                    <button type="submit">Remove</button>
                                </form>
                                {/* Form to specify loan time */}
                                <form action={`/update-loan-time/${item._id}`} method="POST">
                                    <label htmlFor={`loanTime-${item._id}`}>Loan Time:</label>
                                    <input
                                        type="date"
                                        id={`loanTime-${item._id}`}
                                        name="loanTime"
                                        required
                                    />
                                    <button type="submit">Update Loan Time</button>
                                </form>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Your cart is empty!</p>
                )}

                {cartItems.length > 0 && (
                    <form action="/checkout-cart" method="POST">
                        <button type="submit">Checkout</button>
                    </form>
                )}
            </body>
        </html>
    );
};

module.exports = CartJSX;
