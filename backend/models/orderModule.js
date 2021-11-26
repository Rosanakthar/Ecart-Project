import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
    {
      orderItems: [
        {
          name: { type: String, required: true },
          qty: { type: Number, required: true },
          image: { type: String, required: true },
          price: { type: Number, required: true },
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
            
          },
        },
      ],
      shippingAddress: {
        fullName: { type: String },
        address: { type: String },
        city: { type: String },
        postalCode: { type: String },
      },
      paymentMethod: { type: String },
      itemsPrice: { type: Number },
      shippingPrice: { type: Number },
      taxPrice: { type: Number },
      totalPrice: { type: Number },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      isPaid: { type: Boolean, default: false },
      paidAt: { type: Date },
      isDelivered: { type: Boolean, default: false },
      deliveredAt: { type: Date },
    },
    {
      timestamps: true,
    }
  );
  const Order = mongoose.model('Order', orderSchema);
export default Order;