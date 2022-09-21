import Stripe from 'stripe';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
    api: {
        bodyParser: false,  //not to parse the body of the request
    },
};



export default async function (req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            message: 'Method not allowed',
        })
    }

    let event;

    try {
        // 1. Retrieve the event by verifying the signature using the raw body and secret
        const rawBody = await buffer(req);
        const signature = req.headers['stripe-signature'];

        event = stripe.webhooks.constructEvent(
            rawBody.toString(),
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );

        // Successfully constructed event
        console.log('Event-Success:', event.id);

        // 2. Handle event type (add business logic here)
        if (event.type === 'checkout.session.completed') {
            console.log(`Event-Payment received!`);
        } else {
            console.warn(`Event-Unhandled event type: ${event.type}`);
        }

        // 3. Return a response to acknowledge receipt of the event.
        res.json({ received: true });
    } catch (error) {
        return res.status(400).json({
            message: 'Something went wrong',
            error: error.message,
        })
    }
}
