import { useParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export const OrderSuccessPage = () => {
  const { orderId } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center px-4">
      <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
      <h1 className="text-3xl font-bold text-green-800">Order Placed!</h1>
      <p className="mt-2 text-gray-700">Your Order ID: <strong>{orderId}</strong></p>
      <p className="mt-1 text-sm text-gray-500">Thank you for your purchase.</p>
    </div>
  );
};
