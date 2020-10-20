module.exports = function Cart(cart) {

    this.items = cart.cart.items || {};
    this.totalItems = cart.cart.totalItems || 0;
    this.totalPrice = cart.cart.totalPrice || 0;

    this.addItem = function(item, id,) {
        var cartItem = this.items[id];
        if (!cartItem) {
            cartItem = this.items[id] = {item: item, quantity: 0, price: 0};
        }
        cartItem.quantity++;
        cartItem.price = cartItem.item.price.regular_price * cartItem.quantity;
        this.totalItems++;
        this.totalPrice += cartItem.item.price.regular_price;
    };

    this.removeItem = function(id) {
        this.totalItems -= this.items[id].quantity;
        this.totalPrice -= this.items[id].price.regular_price;
        delete this.items[id];
    };
    
    this.getItems = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};