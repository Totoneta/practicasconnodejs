import { model, Schema } from "mongoose";

const CartSchema =  new Schema ({
    productos: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'product',
                require: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
})

export const CartModel = model('cart', CartSchema)