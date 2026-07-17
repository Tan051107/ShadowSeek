import { Modal } from "../../../components/common/Modal";
import { Button } from "../../../components/common/Button";
import { AlertTriangle } from "lucide-react";

export function DeleteModal({ isOpen, onClose, onConfirm, policyName }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Policy">
      <div className="flex flex-col items-center justify-center p-4 text-center">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete the policy <span className="font-semibold">"{policyName}"</span>? This action cannot be undone.
        </p>
        <div className="flex w-full space-x-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" className="flex-1" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}

