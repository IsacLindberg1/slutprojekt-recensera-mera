import React, { useEffect, useState } from 'react';
import PostComments from '../components/PostComments';

const path = 'https://localhost:7076/Review/ViewAllReviews';

interface Review {
    reviewId: number;
    userId: number;
    username: string;
    content: string;
    title: string;
    imgUrl: string;
    comments: { userId: number; comment: string }[];
    categories: { categoryId: number; category: string; reviewId: number; userId: number }[];
    likeCount: number;
}

export default function GetReviewFetch() {
    const [error, setError] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null); 

    useEffect(() => {
        const fetchReviews = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(path);
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const posts = await response.json() as Review[];
                setReviews(posts);
                console.log(posts);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchReviews();
    }, []);

    if (error) {
        return <div>Något gick fel! Vänligen försök igen.</div>;
    }

    return (
        <div className="reviewContainer">
            {isLoading && <div>Laddar...</div>}
            <h2>Recensioner</h2>
            <ul>
                {reviews.map((review, index) => (
                    <div className="gridContainer" key={index}>
                        <article>
                            <p>{review.title}</p>
                            <p>Skribent: {review.username}</p>
                            <ul className="categoriesUl">Kategorier:
                                {review.categories.map((category, index) => (
                                    <li key={index}>{category.category}</li>
                                ))}
                            </ul>
                            <p>{review.content}</p>
                            <img src={"./pictures/" + review.imgUrl + ".png"} alt="" /><br />
                            <a type="submit">👍 {review.likeCount + " "}</a>
                            <button>Gilla</button><br /><br />
                            <button onClick={() => setSelectedReviewId(prevState => prevState === review.reviewId ? null : review.reviewId)}>
                                Kommentera
                            </button>
                            {selectedReviewId === review.reviewId && <PostComments reviewId={review.reviewId} />}
                        </article>
                    </div>
                ))}
            </ul>
        </div>
    );
}
