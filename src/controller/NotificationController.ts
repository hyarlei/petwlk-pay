import { Request, Response } from "express";
import { getDatabase, ref, update } from "firebase/database";
import WebPush from "web-push";

interface SubscriptionModel {
  endpoint: string;
  keys: {
    auth: string;
    p256dh: string;
  };
}

const publicKey =
  "BHIA36V7VyOefuvCQfJeE2dSfiJ7IJdhdDgWQ27YLCS4_hFjbgbEl9AaHdkoVku9plyN65N3FBUVYArnmSi2ZA0";
const privateKey = "bLot-FcD25lJlFF7rFZqnJeIU_WkmO4ZAD8o1ly-hLA";

WebPush.setVapidDetails("http://localhost:3032", publicKey, privateKey);

const NotificationController = {
  async register(req: Request, res: Response) {
    const { path, subscription } = req.body;

    updateSubscription(path, subscription);
    return res.status(200).send("!ok");
  },

  async getKey(req: Request, res: Response) {
    return res.status(200).send(publicKey);
  },

  async send(req: Request, res: Response) {
    try {
      const { subscription, payload } = req.body;
      if (!subscription || !payload)
        return res.status(400).send("Missing subscription or payload");
      await sendNotification(subscription, payload);
      return res.status(200).send("Notification sent");
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

async function updateSubscription(
  path: string,
  subscription: SubscriptionModel
) {
  try {
    const db = getDatabase();
    await update(ref(db, path), {
      subscription,
    });
    return;
  } catch (error) {
    return error;
  }
}

export async function sendNotification(
  subscription: SubscriptionModel,
  payload: string
) {
  try {
    await WebPush.sendNotification(subscription, payload);
  } catch (error) {
    console.error(error);
    return error;
  }
}

export default NotificationController;
