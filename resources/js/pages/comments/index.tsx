import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Index() {
  const [comments, setComments] = useState([]);

  // Fetch comments using Axios
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
        setComments(response.data); // Store the response data into the state
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div>
      <h1>Comments</h1>
      <table>
        <thead>
          <tr>
            <th>Comment ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <tr key={comment.id}>
                <td>{comment.id}</td>
                <td>{comment.name}</td>
                <td>{comment.email}</td>
                <td>{comment.body}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
