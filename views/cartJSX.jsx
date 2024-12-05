const React = require('react');

const CartJSX = ({ cartItems, handleDelete, handleCheckout }) => {
  return (
    <html>
      <head>
        <title>Cart</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
        />
        <style>
          {`
            body {
              background-color: #f8f9fa;
              font-family: Arial, sans-serif;
            }
            .container {
              margin-top: 50px;
            }
            .card {
              margin-bottom: 20px;
            }
            .btn-danger {
              background-color: #d9534f;
              border-color: #d9534f;
            }
            .btn-danger:hover {
              background-color: #c9302c;
              border-color: #c9302c;
            }
          `}
        </style>
      </head>
      <body>
        <div className="container">
          <h1 className="text-center mb-4">Your Cart</h1>
          {cartItems.length > 0 ? (
            <div className="row">
              {cartItems.map((item) => (
                <div className="col-md-4" key={item._id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{item.assetType}</h5>
                      <p className="card-text">
                        <strong>Asset ID:</strong> {item.assetId}
                        <br />
                        <strong>Make:</strong> {item.make}
                        <br />
                        <strong>Model:</strong> {item.model}
                      </p>
                      <label htmlFor={`loanTime-${item._id}`} className="form-label">
                        Loan Time:
                      </label>
                      <input
                        type="date"
                        className="form-control mb-3"
                        id={`loanTime-${item._id}`}
                        name={`loanTime-${item._id}`}
                      />
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">Your cart is empty!</p>
          )}
          {cartItems.length > 0 && (
            <div className="text-center">
              <button className="btn btn-primary mt-4" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          )}
        </div>
      </body>
    </html>
  );
};

module.exports = CartJSX;
