'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Phone, Calendar, IndianRupee } from 'lucide-react';
import { Labour } from '@/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Card, CardContent } from '@/components/ui/card';

interface LabourListProps {
  labours: Labour[];
  onEdit: (labour: Labour) => void;
  onDelete: (id: string) => void;
}

export function LabourList({ labours, onEdit, onDelete }: LabourListProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  // Mobile Card View Component
  const MobileLabourCard = ({ labour }: { labour: Labour }) => (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">{labour.name}</h3>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" onClick={() => onEdit(labour)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setDeleteId(labour.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="text-sm text-muted-foreground space-y-2">
            <div className="flex items-center">
              <IndianRupee className="h-4 w-4 mr-2" />
              <span>₹{labour.dailyRate}/day</span>
            </div>
            {labour.phone && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>{labour.phone}</span>
              </div>
            )}
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{new Date(labour.joinDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Daily Rate</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {labours.map((labour) => (
              <TableRow key={labour.id}>
                <TableCell>{labour.name}</TableCell>
                <TableCell>₹{labour.dailyRate}</TableCell>
                <TableCell>{labour.phone || '-'}</TableCell>
                <TableCell>{new Date(labour.joinDate).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(labour)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setDeleteId(labour.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {labours.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No labours found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {labours.length > 0 ? (
          labours.map((labour) => <MobileLabourCard key={labour.id} labour={labour} />)
        ) : (
          <Card>
            <CardContent className="py-6 text-center text-muted-foreground">No labours found</CardContent>
          </Card>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="w-[24rem] rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the labour and all associated records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
