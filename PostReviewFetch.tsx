import React, { useState, ChangeEvent, FormEvent } from 'react';

function PostReviewFetch() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [imgUrl, setImgUrl] = useState<string | null>(null);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImgUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            categories.forEach(category => formData.append('categories[]', category));
            if (imgUrl) {
                formData.append('image', imgUrl);
            }
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            
            console.log(JSON.stringify({content, title, categories, imgUrl}));
            
            const response = await fetch('https://localhost:7076/Review/CreateReview', {
                method: 'POST',
                mode: "cors",
                headers: myHeaders,
                body: JSON.stringify({'content':content,'title':title,'categories':categories,'imgUrl':imgUrl})
            });

            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Response:', data);

            setTitle('');
            setContent('');
            setCategories([]);
            setImgUrl(null);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        if (checked) {
            setCategories([...categories, value]);
        } else {
            setCategories(categories.filter(cat => cat !== value));
        }
    };

    return (
        <div>
            <h2>Skriv en recension</h2>
            <div className="gridContainer">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Titel: </label><br />
                    <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required /><br /><br />
                    <label htmlFor="description">Recension: </label>
                    <textarea name="content" value={content} onChange={(e) => setContent(e.target.value)}></textarea><br />

                    <p>Välj Kategorier</p>
                    <div className="choseCategories">
                        <input type="checkbox" id="movie" value="movie" name="movie" onChange={handleCategoryChange} />
                        <label htmlFor="movie">Film</label>
                        <input type="checkbox" id="book" value="book" name="book" onChange={handleCategoryChange} />
                        <label htmlFor="book">Bok</label>
                        <input type="checkbox" id="song" value="song" name="song" onChange={handleCategoryChange} />
                        <label htmlFor="song">Låt</label>
                        <input type="checkbox" id="game" value="game" name="game" onChange={handleCategoryChange} />
                        <label htmlFor="game">Spel</label><br />
                    </div>

                    <label htmlFor="image">Välj bild - valfritt : </label>
                    <input type="file" onChange={handleImageChange} /><br /><br />
                    <button type="submit">Ladda upp</button>
                </form>
            </div>
        </div>
    );
}

export default PostReviewFetch;