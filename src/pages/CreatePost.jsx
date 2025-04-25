import { useEffect, useState } from 'react';
import Navbar_Login from '../components/Navbar_login';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import "./CreatePost.css";
import { useLocation } from 'react-router-dom';

const CreatePost = ({ navigate, supabase }) => {
  const [post, setPost] = useState({ 
    title: '', 
    content: '',
    image: '',
  });

  const [userId, setUserId] = useState(null);
  const sessionUserId = useLocation().state?.user_id;

  useEffect(() => {
    const fetchUserRow = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('id', sessionUserId)  // match the UUID from Supabase Auth
        .single();

      if (error) {
        console.error("Error fetching user row:", error);
        alert("Error fetching user profile from DB.");
      } else {
        setUserId(data.id);
      }
    };

    if (sessionUserId) {
      fetchUserRow();
    }
  }, [sessionUserId, supabase]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("User not found in database!");
      return;
    }
    await addPost();
    navigate('/home', { state: { user_id: userId } });
  };

  const addPost = async () => {
    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          user_id: userId,
          title: post.title,
          content: post.content,
          image: post.image,
        }
      ]);

    if (error) {
      console.error("Insert error:", error);
      alert("Error creating post");
    }
  };

  return (
    <div className='pg'>
      <Navbar_Login 
        navigate={navigate} 
        supabase={supabase}
        userId={userId} />
      <div className='post-form-container'>
        <h1 className='form-title'>Create a Post</h1>
        <form onSubmit={handleSubmit}>
          <TextInput 
            placeholder="Title"
            classes="post-form-input form-txt"
            value={post.title}
            handleChange={handleChange}
            name="title"
          />
          <textarea
            name="content"
            placeholder="Content..."
            value={post.content}
            onChange={handleChange}
            className="text-area form-txt"
          />
          <div className="row">
            <TextInput 
              placeholder="Image URL (Optional)"
              classes="post-form-input form-txt"
              value={post.image}
              handleChange={handleChange}
              name="image"
            />
          </div>
          <Button 
            submit={true}
            content="Create Post"
            handleClick={handleSubmit}
            classes="form-btn"
          />
        </form>
      </div>
    </div>
  );
};

//posting works :)

export default CreatePost;

