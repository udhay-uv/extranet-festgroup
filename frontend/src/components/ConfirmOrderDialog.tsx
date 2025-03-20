import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { ShoppingBag, Package } from "lucide-react";
  import { motion } from "framer-motion";
  
  type ConfirmOrderDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    totalAmount: number;
    productCount: number;
  };
  
  export const ConfirmOrderDialog = ({
    isOpen,
    onClose,
    onConfirm,
    totalAmount,
    productCount,
  }: ConfirmOrderDialogProps) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-blue-50 to-white border-blue-200 shadow-xl sm:max-w-md">
        <DialogHeader>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mx-auto"
          >
            <ShoppingBag className="w-12 h-12 text-blue-600" />
          </motion.div>
          <DialogTitle className="text-2xl text-center text-blue-700">Confirm Your Order</DialogTitle>
          <DialogDescription className="text-center text-blue-600">
            Please review your order details before confirming
          </DialogDescription>
        </DialogHeader>
  
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="space-y-4 py-4"
        >
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-blue-100">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">Total Products</span>
            </div>
            <span className="font-semibold text-blue-700">{productCount}</span>
          </div>
  
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-blue-100">
            <span className="text-gray-700">Total Amount</span>
            <span className="font-semibold text-blue-700">₹{totalAmount.toLocaleString()}</span>
          </div>
        </motion.div>
  
        <DialogFooter className="flex gap-3 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Confirm Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );