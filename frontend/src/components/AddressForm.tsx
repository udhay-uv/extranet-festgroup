import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";

const stateOptions = [
  { code: 'TN', name: 'Tamil Nadu' },
  { code: 'KA', name: 'Karnataka' },
  { code: 'MH', name: 'Maharashtra' },
  { code: 'HR', name: 'Haryana' },
  { code: 'DL', name: 'Delhi' },
  { code: 'GJ', name: 'Gujarat' },
  { code: 'WB', name: 'West Bengal' }
];

export type Address = {
  id?: number;
  bs: string;
  type: string;
  address1: string;
  address2: string;
  city: string;
  pincode: string;
  stateCode: string;
  email?: string;
  phone: string;
  contactName: string;
};

export default function AddressForm({ onSave }: { onSave: (data: Address) => void }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Address>({
    bs: "Shipping",
    type: "",
    address1: "",
    address2: "",
    city: "",
    pincode: "",
    stateCode: "",
    email: "",
    phone: "",
    contactName: ""
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    onSave(formData);
    setFormData({
      bs: "Shipping",
      type: "",
      address1: "",
      address2: "",
      city: "",
      pincode: "",
      stateCode: "",
      email: "",
      phone: "",
      contactName: ""
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">+ Add New Address</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-blue-700 text-lg">Add New Address</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Type of Addresses</Label>
            <Select value={formData.bs} onValueChange={val => handleChange("bs", val)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Billing">Billing</SelectItem>
                <SelectItem value="Shipping">Shipping</SelectItem>
                <SelectItem value="BILLING = SHIPPING">BILLING = SHIPPING</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Type</Label>
            <Input value={formData.type} onChange={e => handleChange("type", e.target.value)} />
          </div>
          <div>
            <Label>Address Line 1</Label>
            <Input value={formData.address1} onChange={e => handleChange("address1", e.target.value)} />
          </div>
          <div>
            <Label>Address Line 2</Label>
            <Input value={formData.address2} onChange={e => handleChange("address2", e.target.value)} />
          </div>
          <div>
            <Label>City</Label>
            <Input value={formData.city} onChange={e => handleChange("city", e.target.value)} />
          </div>
          <div>
            <Label>Pincode</Label>
            <Input value={formData.pincode} onChange={e => handleChange("pincode", e.target.value)} />
          </div>
          <div>
            <Label>State Code</Label>
            <Select value={formData.stateCode} onValueChange={val => handleChange("stateCode", val)}>
              <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
              <SelectContent>
                {stateOptions.map((state) => (
                  <SelectItem key={state.code} value={state.code}>
                    {state.code} {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Email (Optional)</Label>
            <Input value={formData.email} onChange={e => handleChange("email", e.target.value)} />
          </div>
          <div>
            <Label>Contact Name</Label>
            <Input value={formData.contactName} onChange={e => handleChange("contactName", e.target.value)} />
          </div>
          <div>
            <Label>Phone</Label>
            <Input value={formData.phone} onChange={e => handleChange("phone", e.target.value)} />
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Address</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
