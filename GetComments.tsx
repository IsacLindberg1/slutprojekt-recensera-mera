import React, { useEffect, useState } from 'react';

const path = 'https://localhost:7076/Comment/GetAllComments';

interface Comment{
    username: string,
    comment: string;
}

export default function GetComments() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [error, setError] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchComments = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(path);
                if (!response.ok) {
                    throw new Error('Failed to fetch comments');
                }
                const commentsData = await response.json();
                setComments(commentsData);
                console.log(commentsData);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchComments();
    }, []);

    if (error) {
        return <div>Gick inte att hämta kommentarer!</div>;
    }

    return (
        <div className="commentsContainer">
            {isLoading && <div>Laddar kommentarer...</div>}
            <ul>
                {comments.map((comment, index) => (
                    <React.Fragment key={index}>
                        <li>{comment.username}</li>
                        <li>{comment.comment}</li>
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
}
