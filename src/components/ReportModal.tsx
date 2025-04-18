
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface ReportModalProps {
  isOpen: boolean;
  fareId: string | null;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, fareId, onClose }) => {
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!issueType) {
      toast({
        title: "Missing information",
        description: "Please select an issue type",
        variant: "destructive"
      });
      return;
    }

    // In a real app, we would send this data to the backend
    console.log({
      fareId,
      issueType,
      description,
      email,
      timestamp: new Date().toISOString()
    });

    toast({
      title: "Report submitted",
      description: "Thank you for helping us improve our data!",
    });

    // Reset form and close modal
    setIssueType('');
    setDescription('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report Fare Issue</DialogTitle>
          <DialogDescription>
            Help us improve our data by reporting any issues you've found with this fare.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="issue-type">Issue Type</Label>
            <select
              id="issue-type"
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select an issue</option>
              <option value="price">Incorrect price</option>
              <option value="schedule">Wrong schedule information</option>
              <option value="availability">Service no longer available</option>
              <option value="amenities">Incorrect amenities</option>
              <option value="other">Other issue</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Please provide details about the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Your Email (optional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              We'll only contact you if we need more information.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit Report</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportModal;
