import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function useRazorpay() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const initiatePayment = async (amount: number, onSuccess?: () => void) => {
    setLoading(true);
    try {
      // 1. Create order on the backend
      const orderRes = await apiRequest("POST", "/api/payments/create-order", { amount });
      const order = await orderRes.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: order.amount,
        currency: order.currency,
        name: "CodeArena Premium",
        description: "Unlocking elite tactical content",
        order_id: order.id,
        handler: async function (response: any) {
          // 2. Verify payment on the backend
          try {
            const verifyRes = await apiRequest("POST", "/api/payments/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            const result = await verifyRes.json();

            if (result.status === "success") {
              toast({
                title: "Payment Successful",
                description: "You are now a Premium operative!",
              });
              if (onSuccess) onSuccess();
            } else {
              toast({
                title: "Payment Verification Failed",
                description: result.message,
                variant: "destructive",
              });
            }
          } catch (err) {
            console.error("Verification error:", err);
            toast({
              title: "Error",
              description: "Failed to verify payment",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: "Operative",
          email: "operative@codearena.com",
        },
        theme: {
          color: "#3b82f6",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initiation error:", error);
      toast({
        title: "Payment Failed",
        description: "Could not initiate payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { initiatePayment, loading };
}
