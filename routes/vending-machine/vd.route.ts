import { Router, Request, Response } from "express";
import { price, STATE } from "../../constants";
import products from "../../constants/products";

const router = Router();

// actually we need to save these values in database
let balance: number = 0;
let state: number = STATE.READY;
let productId: number = 0;

let msg: string;

// send the product lists
const getProducts = (req: Request, res: Response) => {
    if (!products)
        return res.status(500).json({
            msg: 'No products'
        });
    res.json({
        msg: msg ? msg : 'Insert Coins',
        products
    });
};

// insert the coins
const insertCoins = (req: Request, res: Response) => {
    const amount: number = Number.parseInt(req.query.amount as string);
    const product = products.map(product => product.id).filter(id => id == productId);

    // handle the event (set the next step)
    switch (state) {
        case STATE.READY:
        case STATE.VENDING:
        case STATE.CAN_RETURN_COINS:
            balance = balance + amount;
            msg = `you've put ${amount} coins`;
            if (balance >= price)
                state = STATE.COLLECTED;
            else
                state = STATE.VENDING;
            break;
        default:
            msg = `you can't put more than ${price} coins`;
    }

    // show what to do after an event
    switch (state) {
        case STATE.VENDING:
            msg += ', you can select the product';
            break;
        case STATE.COLLECTED:
            if (product.length > 0)
                msg += ', please take the product';
            else
                msg += ', please select the product';
            break;
        default:
            break;
    }

    msg = `Current balance is ${balance}, ` + msg;
    res.json({ msg });
}

// return the coins
const returnCoins = (req: Request, res: Response) => {
    // handle the event (set the next step)
    switch (state) {
        case STATE.CAN_RETURN_COINS:
            msg = "you've returned the coins";
            balance = 0;
            state = STATE.READY;
            break;
        case STATE.READY:
            msg = "you can't return the coins";
            break;
        default:
            msg = "you can't return the coins before taking the product";
            break;
    }

    // show what to do after an event
    switch (state) {
        case STATE.READY:
            msg += ', please insert the coins';
            break;
        default:
            break;
    }

    msg = `Current balance is ${balance}, ` + msg;
    res.json({ msg });
}

// select the product
const selectProduct = (req: Request, res: Response) => {
    productId = Number.parseInt(req.query.id as any);

    // handle the event (set the next step)
    switch (state) {
        case STATE.VENDING:
        case STATE.COLLECTED:
            msg = `you've selected the Product${productId}`;
            break;
        default:
            msg = "you can't select the products before putting the coins";
            productId = 0;
            break;
    }

    msg = `Current balance is ${balance}, ` + msg;
    res.json({ msg, productId });
}

// take the product
const takeProduct = (req: Request, res: Response) => {
    const product = products.map(product => product.id).filter(id => id == productId);

    // handle the event (set the next step)
    switch (state) {
        case STATE.COLLECTED:
            if (product.length > 0) {
                msg = `you've taken the Product${productId}`;
                balance -= price;
                if (balance > 0)
                    state = STATE.CAN_RETURN_COINS;
                else
                    state = STATE.READY;
                productId = 0;
            } else {
                msg = "you can't take the product, please select the product";
            }
            break;
        default:
            msg = "you can't take the product, please insert enough coins";
            break;
    }

    // show what to do after an event
    switch (state) {
        case STATE.READY:
            msg += ', please insert the coins';
            break;
        case STATE.CAN_RETURN_COINS:
            msg += ', you can return the coins';
            break;
        default:
            break;
    }

    msg = `Current balance is ${balance}, ` + msg;
    res.json({ msg, productId });
}

router.get('/products', getProducts);
router.put('/insert', insertCoins);
router.get('/return', returnCoins);
router.put('/select', selectProduct);
router.get('/take', takeProduct);

export default router;