import '../CSS/Carrito.css'

function Carrito() {
    return (
        <div className="nav container">

            <div className="cart">
                <h2 className="cart-title">Tu carrito</h2>

                <div className="cart-content">
                    <div className="cart-box">
                        <img
                            src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5721/5721500_sd.jpg"
                            alt="producto"
                            className="cart-img"
                        />

                        <div className="detail-box">
                            <div className="cart-product-title">Producto</div>
                            <div className="cart-price">$0</div>

                            <input
                                type="number"
                                min="1"
                                defaultValue="1"
                                className="cart-quantity"
                            />
                        </div>

                        <i className="cart-remove">
                            <span className="material-symbols-outlined">
                                delete
                            </span>
                        </i>
                    </div>
                </div>

                <div className="total">
                    <div className="total-title">Total</div>
                    <div className="total-price">$0</div>
                </div>

                <button type="button" className="btn-buy">
                    Comprar ahora
                </button>

                <i id="close-cart">
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </i>
            </div>

        </div>
    )
}

export default Carrito