'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LabourForm } from '@/components/labour/labour-form';
import { LabourList } from '@/components/labour/labour-list';
import { Labour } from '@/types';
import { db } from '@/lib/db';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function LaboursPage() {
  const [labours, setLabours] = useState<Labour[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLabour, setSelectedLabour] = useState<Labour | undefined>();

  useEffect(() => {
    setLabours(db.getLabours());
  }, []);

  const handleSubmit = (data: Omit<Labour, 'id'>) => {
    try {
      if (selectedLabour) {
        const updated = db.updateLabour(selectedLabour.id, data);
        if (updated) {
          setLabours(db.getLabours());
          toast.success('Labour updated successfully');
        }
      } else {
        db.addLabour(data);
        setLabours(db.getLabours());
        toast.success('Labour added successfully');
      }
      handleClose();
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleEdit = (labour: Labour) => {
    setSelectedLabour(labour);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    try {
      db.deleteLabour(id);
      setLabours(db.getLabours());
      toast.success('Labour deleted successfully');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setSelectedLabour(undefined);
  };

  return (
    <div className="w-full px-4 sm:container sm:mx-auto py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Labours</h1>
        <Button onClick={() => setIsDialogOpen(true)} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Labour
        </Button>
      </div>

      <div className="w-full overflow-x-auto">
        <LabourList labours={labours} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="md:w-[calc(100%-2rem)] w-[calc(100%-2rem)] rounded-lg md:max-w-lg md:mx-4 mx-auto">
          <DialogHeader>
            <DialogTitle>{selectedLabour ? 'Edit' : 'Add'} Labour</DialogTitle>
          </DialogHeader>
          <LabourForm labour={selectedLabour} onSubmit={handleSubmit} onCancel={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
