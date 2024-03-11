import { defer } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState } from "react"; 
import PostReviewFetch from "../fetches/PostReviewFetch";

function CreateReview(){
   return(
        <PostReviewFetch />
   );
}
export default CreateReview;