

const initialCartValues = {
    cartDetails: {},
    cartCount: 0,
    totalPrice: 0
}

const addItem = (state = {}, product = null, quantity = 0) => {
    if (quantity <= 0 || !product) return state;

    let newProduct = state?.cartDetails?.[product.id]

    if (newProduct) {
        newProduct.quantity += quantity
    } else {
        newProduct = {
            ...product,
            quantity
        }
    }

    return {
        ...state,
        cartDetails: {
            ...state.cartDetails,
            [product.id]: newProduct
        },
        cartCount: Math.max(0, state.cartCount + quantity),
        totalPrice: Math.max(state.totalPrice + product.price * quantity)
    }
}


const removeItem = (state = {}, product = null, quantity = 0) => {
    if (quantity <= 0 || !product) return state;

    let newProduct = state?.cartDetails?.[product.id]

    if (newProduct) {
        if (quantity >= newProduct.quantity) {
            const { [product.id]: id, ...details } = state.cartDetails;
            return {
                ...state,
                cartDetails: details,
                cartCount: Math.max(0, state.cartCount - newProduct.quantity),
                totalPrice: Math.max(0, state.totalPrice - product.price * newProduct.quantity),
            };
        } else {
            return {
                ...state,
                cartDetails: {
                    ...state.cartDetails,
                    [product.id]: {
                        ...newProduct,
                        quantity: newProduct.quantity - quantity,
                    },
                },
                cartCount: Math.max(0, state.cartCount - quantity),
                totalPrice: Math.max(0, state.totalPrice - product.price * quantity),
            };
        }

    } else {
        return state;
    }
};


const clearCart = () => {
    return initialCartValues;
};


const cartReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return addItem(state, action.product, action.quantity);
        case 'REMOVE_ITEM':
            return removeItem(state, action.product, action.quantity);
        case 'CLEAR_CART':
            return clearCart();
        default:
            return state;
    }
};