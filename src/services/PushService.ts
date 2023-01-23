import Axios from "axios";
import { Subscription } from "../interfaces/notification";
import { apiHost } from "./Api";

const apiUrl = `${apiHost}/notification`;

const urlB64ToUint8Array = (base64String: string) => {
  const padding = `=`.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, `+`).replace(/_/g, `/`);
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const getSubscription = async () => {
  const registration = await navigator.serviceWorker.ready;

  const existing = await registration.pushManager.getSubscription();
  if (existing) throw new Error(`Push subscription already exists`);

  const LATICE_PUSH_PUBLIC_KEY =
    "BAcmTwIsHhCBmA4AAKN9zS34JXof3BEaIqMhfNFLnhMUTcJHNSgnrEFvJ8jx-jxLg16aviJcc2YbZETvmoFabE4";

  const applicationServerKey = urlB64ToUint8Array(LATICE_PUSH_PUBLIC_KEY);
  const options = { applicationServerKey, userVisibleOnly: true };
  return registration.pushManager.subscribe(options);
};

const removeSubscription = async () => {
  const registration = await navigator.serviceWorker.ready;

  const subscription = await registration.pushManager.getSubscription();
  if (!subscription) throw new Error(`Push subscription does not exist`);

  return subscription.unsubscribe();
};

export default {
  requestPermission() {
    return window.Notification.requestPermission();
  },
  async subscribe(token: string): Promise<Subscription> {
    try {
      const sub = await getSubscription();

      const res = await Axios({
        url: `${apiUrl}/subscribe`,
        method: `POST`,
        data: sub,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  },
  async unsubscribe(token: string, id: string) {
    try {
      await removeSubscription();

      await Axios({
        url: `${apiUrl}/subscribe/${id}`,
        method: `DELETE`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return;
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  },
};
