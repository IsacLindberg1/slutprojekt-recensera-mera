import { defer } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ReviewFetch from '../fetches/GetReviewFetch'

function Home(){
   return(
    <div>
        <main>
            <ReviewFetch />
        </main>
        <footer>
            <p>Recensera Mera - Isac Lindberg</p>
        </footer>
    </div>
    
   )
}
export default Home;