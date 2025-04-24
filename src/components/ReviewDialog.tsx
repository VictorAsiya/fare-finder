
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star, StarHalf } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Review } from '@/data/fakeData';

interface ReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  fareId: string;
  companyId: string;
  companyName: string;
  existingReviews: Review[];
}

const ReviewDialog: React.FC<ReviewDialogProps> = ({ 
  isOpen, 
  onClose, 
  fareId, 
  companyId, 
  companyName,
  existingReviews 
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddReview, setShowAddReview] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting",
        variant: "destructive"
      });
      return;
    }

    if (comment.trim().length < 10) {
      toast({
        title: "Review too short",
        description: "Please write a more detailed review",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // In a real app, this would call an API to save the review
    setTimeout(() => {
      toast({
        title: "Review submitted",
        description: "Your review has been submitted for moderation",
      });
      setRating(0);
      setComment('');
      setIsSubmitting(false);
      setShowAddReview(false);
    }, 1000);
  };

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const approvedReviews = existingReviews.filter(review => review.status === 'approved');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reviews for {companyName}</DialogTitle>
          <DialogDescription>
            {approvedReviews.length > 0 
              ? `${approvedReviews.length} user reviews for this service` 
              : "No reviews yet for this service"}
          </DialogDescription>
        </DialogHeader>

        {approvedReviews.length > 0 ? (
          <div className="max-h-80 overflow-y-auto space-y-4">
            {approvedReviews.map((review) => (
              <div key={review.id} className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <div className="font-medium">{review.userName}</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-500 mt-1">{new Date(review.date).toLocaleDateString()}</div>
                <p className="mt-2 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-4 text-center text-muted-foreground">
            Be the first to leave a review!
          </div>
        )}

        {showAddReview ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="rating">Your Rating</Label>
              <div className="flex space-x-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 cursor-pointer ${star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                    onClick={() => handleStarClick(star)}
                  />
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="comment">Your Review</Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this service..."
                className="mt-1"
              />
            </div>

            <div className="flex space-x-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowAddReview(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-end">
            <Button onClick={() => setShowAddReview(true)}>
              Write a Review
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
