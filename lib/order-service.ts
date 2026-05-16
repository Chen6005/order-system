import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "./firebase";
import type { Order, OrderStatus } from "./types";

const ordersCollection = "orders";

function getOrdersQuery() {
  return query(collection(db, ordersCollection), orderBy("createdAt", "desc"));
}

export async function createOrder(order: Order): Promise<void> {
  await setDoc(doc(db, ordersCollection, order.id), order);
}

export async function getOrders(): Promise<Order[]> {
  const snapshot = await getDocs(getOrdersQuery());

  return snapshot.docs.map((orderDoc) => orderDoc.data() as Order);
}

export function subscribeToOrders(
  callback: (orders: Order[]) => void,
  onError?: (error: Error) => void,
) {
  return onSnapshot(
    getOrdersQuery(),
    (snapshot) => {
      const orders = snapshot.docs.map((orderDoc) => orderDoc.data() as Order);

      callback(orders);
    },
    onError,
  );
}

export function subscribeToOrder(
  orderId: string,
  callback: (order: Order | null) => void,
  onError?: (error: Error) => void,
) {
  return onSnapshot(
    doc(db, ordersCollection, orderId),
    (snapshot) => {
      callback(snapshot.exists() ? (snapshot.data() as Order) : null);
    },
    onError,
  );
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
): Promise<void> {
  await updateDoc(doc(db, ordersCollection, orderId), { status });
}
