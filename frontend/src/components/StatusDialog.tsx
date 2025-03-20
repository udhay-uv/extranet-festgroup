import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export type StatusMessage = {
  type: 'success' | 'error';
  message: string;
};

export const StatusDialog = ({ status, onClose }: { status: StatusMessage; onClose: () => void }) => (
  <Dialog open={true} onOpenChange={onClose}>
    <DialogContent className={`${status.type === 'success' ? 'bg-gradient-to-br from-blue-50 to-white border-blue-200' : 'bg-gradient-to-br from-red-50 to-white border-red-200'} shadow-xl`}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="flex flex-col items-center justify-center p-6 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {status.type === 'success' ? (
            <CheckCircle className="w-16 h-16 text-blue-600 mb-4" />
          ) : (
            <XCircle className="w-16 h-16 text-red-600 mb-4" />
          )}
        </motion.div>
        <h2 className={`text-2xl font-bold mb-2 ${status.type === 'success' ? 'text-blue-700' : 'text-red-700'}`}>
          {status.type === 'success' ? 'Success!' : 'Error'}
        </h2>
        <p className={`text-lg ${status.type === 'success' ? 'text-blue-600' : 'text-red-600'}`}>
          {status.message}
        </p>
        <Button
          onClick={onClose}
          className={`mt-6 ${status.type === 'success' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'}`}
        >
          Close
        </Button>
      </motion.div>
    </DialogContent>
  </Dialog>
);