import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "./firebase";
import type { Order, OrderStatus } from "./types";

const ordersCollection = "orders";

export async function createOrder(order: Order): Promise<void> {
  await setDoc(doc(db, ordersCollection, order.id), order);
}

export async function getOrders(): Promise<Order[]> {
  const ordersQuery = query(
    collection(db, ordersCollection),
    orderBy("createdAt", "desc"),
  );
  const snapshot = await getDocs(ordersQuery);

  return snapshot.docs.map((orderDoc) => orderDoc.data() as Order);
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
): Promise<void> {
  await updateDoc(doc(db, ordersCollection, orderId), { status });
}
