const React = require('react');

const checkoutSuccessJSX = ({ name, message }) => {
    return (
        <html>
            <head>
                <title>Checkout Success</title>
            </head>
            <body>
                <h1>Checkout Successful!</h1>

                <p>
                    Thank you, <strong>{name}</strong>! Your items have been successfully processed.
                </p>
                <p>{message}</p>

                <form action="/cart" method="GET">
                    <button type="submit">Return to Cart</button>
                </form>
            </body>
        </html>
    );
};

module.exports = checkoutSuccessJSX;
