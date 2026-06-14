// // src/services/api.ts

// const BASE = "http://localhost:3000/api";

// // ── Hardcoded IDs مؤقتاً ─────────────────────────────
// const CLIENT_ID   = "6a0ec5d6abd344d2021f462a";
// const PROVIDER_ID = "dd0000000000000000000001";

// async function request<T>(path: string, options?: RequestInit): Promise<T> {
//   const res = await fetch(`${BASE}${path}`, {
//     headers: { "Content-Type": "application/json" },
//     ...options,
//   });
//   const json = await res.json();
//   if (!res.ok) throw new Error(json.message ?? "Request failed");
//   return json;
// }

// // ── Create Order ──────────────────────────────────────
// export async function createOrder(payload: {
//   cart: { service: { id: string; price: number }; quantity: number }[];
//   pickupTime: string;
//   deliveryTime: string | null;
//   shippingPrice: number;
//   couponCode: string | null;
//   paymentMethod: string;
//   deliveryType: "pickup" | "delivery";
//   deliveryAddress: string | null;
// }) {
//   return request<any>("/orders", {
//     method: "POST",
//     body: JSON.stringify({
//       client:           CLIENT_ID,
//       provider:         PROVIDER_ID,
//       items:            payload.cart.map(i => ({
//         providerService_id: i.service.id,
//         quantity:           i.quantity,
//       })),
//       pickup_time:      payload.pickupTime,
//       delivery_time:    payload.deliveryTime,
//       shipping_price:   payload.shippingPrice,
//       payment_method:   payload.paymentMethod,
//       coupon_code:      payload.couponCode ?? undefined,
//       delivery_type:    payload.deliveryType,
//       delivery_address: payload.deliveryAddress,
//     }),
//   });
// }

// // ── Pay Order ─────────────────────────────────────────
// export async function payOrder(orderId: string, payload: {
//   paymentMethod: string;
//   cardNumber?:   string;
//   cardExpiry?:   string;
//   cardCvv?:      string;
//   phoneNumber?:  string;
// }) {
//   return request<any>(`/payments/pay/${orderId}`, {
//     method: "POST",
//     body: JSON.stringify({
//       client_id:      CLIENT_ID,
//       payment_method: payload.paymentMethod,
//       card_number:    payload.cardNumber,
//       card_expiry:    payload.cardExpiry,
//       card_cvv:       payload.cardCvv,
//       phone_number:   payload.phoneNumber,
//     }),
//   });
// }

// // ── Validate Coupon ───────────────────────────────────
// export async function validateCoupon(code: string, orderAmount: number) {
//   return request<any>("/coupons/validate", {
//     method: "POST",
//     body: JSON.stringify({
//       client_id:    CLIENT_ID,
//       provider_id:  PROVIDER_ID,
//       code,
//       order_amount: orderAmount,
//     }),
//   });
// }



// src/services/api.ts

const BASE = "http://localhost:3000/api";

// ── Helper: get auth token from localStorage ──────────
function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    ...options,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message ?? "Request failed");
  return json;
}

// ── Create Order ──────────────────────────────────────
export async function createOrder(payload: {
  cart: { service: { id: string; price: number }; quantity: number }[];
  pickupTime: string;
  deliveryTime: string | null;
  shippingPrice: number;
  couponCode: string | null;
  paymentMethod: string;
  deliveryType: "pickup" | "delivery";
  deliveryAddress: string | null;
  providerId: string;
}) {
  return request<any>("/orders", {
    method: "POST",
    body: JSON.stringify({
      provider:         payload.providerId,
      items:            payload.cart.map(i => ({
        providerService_id: i.service.id,
        quantity:           i.quantity,
      })),
      pickup_time:      payload.pickupTime,
      delivery_time:    payload.deliveryTime,
      shipping_price:   payload.shippingPrice,
      payment_method:   payload.paymentMethod,
      coupon_code:      payload.couponCode ?? null,
      delivery_type:    payload.deliveryType,
      // الـ backend يتوقع "address" وليس "delivery_address"
      address:          payload.deliveryType === "delivery"
                          ? (payload.deliveryAddress ?? "")
                          : null,
    }),
  });
}

// ── Pay Order ─────────────────────────────────────────
export async function payOrder(orderId: string, payload: {
  paymentMethod: string;
  cardNumber?:   string;
  cardExpiry?:   string;
  cardCvv?:      string;
  phoneNumber?:  string;
}) {
  return request<any>(`/payments/pay/${orderId}`, {
    method: "POST",
    body: JSON.stringify({
      payment_method: payload.paymentMethod,
      card_number:    payload.cardNumber,
      card_expiry:    payload.cardExpiry,
      card_cvv:       payload.cardCvv,
      phone_number:   payload.phoneNumber,
    }),
  });
}

// ── Validate Coupon ───────────────────────────────────
export async function validateCoupon(code: string, orderAmount: number, providerId: string) {
  return request<any>("/coupons/validate", {
    method: "POST",
    body: JSON.stringify({
      provider_id:  providerId,
      code,
      order_amount: orderAmount,
    }),
  });
}



