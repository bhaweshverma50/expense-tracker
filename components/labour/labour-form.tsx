'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Labour } from '@/types';

interface LabourFormProps {
  labour?: Labour;
  onSubmit: (data: Omit<Labour, 'id'>) => void;
  onCancel: () => void;
}

export function LabourForm({ labour, onSubmit, onCancel }: LabourFormProps) {
  const [formData, setFormData] = useState({
    name: labour?.name || '',
    dailyRate: labour?.dailyRate || '',
    phone: labour?.phone || '',
    joinDate: labour?.joinDate || new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.dailyRate) {
      toast.error('Please fill in all required fields');
      return;
    }

    onSubmit({
      name: formData.name,
      dailyRate: Number(formData.dailyRate),
      phone: formData.phone,
      joinDate: formData.joinDate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter labour name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dailyRate">Daily Rate (₹) *</Label>
        <Input
          id="dailyRate"
          type="number"
          value={formData.dailyRate}
          onChange={(e) => setFormData({ ...formData, dailyRate: e.target.value })}
          placeholder="Enter daily rate"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Enter phone number"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="joinDate">Join Date</Label>
        <Input
          id="joinDate"
          type="date"
          value={formData.joinDate}
          onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{labour ? 'Update' : 'Add'} Labour</Button>
      </div>
    </form>
  );
}
