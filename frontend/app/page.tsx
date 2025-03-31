'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<String | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    authCode: ''
  });

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:9001/list', {
        // mode:'no-cors',
        headers: {
          
          'Content-Type': 'application/json',
          'PinggyAuthHeader': 'dummy-auth-for-fetch' // This can be any value since backend only checks for presence
        },
        credentials: "include" 
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      
      const data = await response.json();
      setPosts(data);
      setError(null);
    } catch (err:unknown) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!formData.authCode) {
      setError('Auth Code is required');
      return;
    }

    try {
      const response = await fetch('http://localhost:9001/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'PinggyAuthHeader': formData.authCode
        },
        body: JSON.stringify({
          title: formData.title,
          body: formData.body
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      // Clear form and refresh posts
      setFormData({
        title: '',
        body: '',
        authCode: ''
      });
      await fetchPosts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Head>
        <title>Post App</title>
        <meta name="description" content="Submit and view posts" />
      </Head>

      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Post Application</h1>
        
        {/* Submission Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
                Body
              </label>
              <textarea
                id="body"
                name="body"
                value={formData.body}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="authCode" className="block text-sm font-medium text-gray-700 mb-1">
                Auth Code
              </label>
              <input
                type="text"
                id="authCode"
                name="authCode"
                value={formData.authCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Post
            </button>
          </form>
        </div>
        
        {/* Posts List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Posts</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2">Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No posts available</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post:any, index:number) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                  <h3 className="text-lg font-medium">{post.title}</h3>
                  <p className="text-gray-600 mt-1">{post.body}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    <span className="font-semibold">Auth:</span> {post.pinggyAuthHeader}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}