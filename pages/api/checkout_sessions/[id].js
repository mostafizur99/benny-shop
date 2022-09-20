import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function (req, res) {
    const id = req.query.id;

    try {
        if (!id.startsWith('cs_')) {
            throw Error('Invalid Checkout Session ID.');
        }
        const checkout_session = await stripe.checkout.sessions.retrieve(id);

        res.status(200).json(checkout_session);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        })
    }
}
