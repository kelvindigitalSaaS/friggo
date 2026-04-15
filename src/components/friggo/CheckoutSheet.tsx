import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider
} from "@stripe/react-stripe-js";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { Loader2, X } from "lucide-react";

interface CheckoutSheetProps {
  clientSecret: string | null;
  publishableKey: string | null;
  planName: string;
  onClose: () => void;
}

export function CheckoutSheet({
  clientSecret,
  publishableKey,
  planName,
  onClose
}: CheckoutSheetProps) {
  const [stripePromise, setStripePromise] = useState<ReturnType<
    typeof loadStripe
  > | null>(null);

  useEffect(() => {
    if (publishableKey) {
      setStripePromise(loadStripe(publishableKey));
    }
  }, [publishableKey]);

  const isOpen = !!clientSecret && !!publishableKey;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="bottom"
        className="h-[92vh] rounded-t-3xl p-0 overflow-hidden flex flex-col"
      >
        <SheetHeader className="flex flex-row items-center justify-between px-5 py-4 border-b shrink-0">
          <SheetTitle className="text-base font-bold">
            Assinar plano {planName}
          </SheetTitle>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </SheetHeader>

        <div className="flex-1 overflow-auto">
          {stripePromise && clientSecret ? (
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ clientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          ) : (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
