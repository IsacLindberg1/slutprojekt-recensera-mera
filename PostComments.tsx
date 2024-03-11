import React, { useState } from 'react';
import GetComments from './GetComments';

interface CommentsProps {
    reviewId: number; 
  }

  const Comments: React.FC<CommentsProps> = ({ reviewId }) => {
    const [comment, setComment] = useState<string>('');
    const [commentsList, setCommentsList] = useState<string[]>([]);
  
    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(event.target.value);
    };
  
    const handleSubmitComment = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      const newComment = {
        reviewId: reviewId,
        comment: comment,
      };

    try {
      const response = await fetch('https://localhost:7076/Comment/CreateComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      setCommentsList([...commentsList, comment]);
      setComment("");
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <main className="commentsContainer">
      <section>
        <h3>Kommentarer</h3>
        <ul><GetComments />
          {commentsList.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <form onSubmit={handleSubmitComment}>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Skriv en kommentar..."
            required
          />
          <button type="submit">Skicka</button>
        </form>
      </section>
    </main>
  );
}

export default Comments;