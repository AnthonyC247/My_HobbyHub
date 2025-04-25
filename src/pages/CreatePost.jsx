import { useEffect, useState } from 'react';
import Navbar_Login from '../components/Navbar_login';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import "./CreatePost.css";
import { useLocation } from 'react-router-dom';

const CreatePost = ({navigate, supabase}) => {
    const [post, setPost] = useState({ 
        title: '', 
        content: '',
        image: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prevPost) => ({
            ...prevPost,
            [name]: value,
        }));
    }

    const userId = useLocation().state?.user_id;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // add the post to the database
        await addPost();
        navigate('/home', {state: {
            user_id: userId,
        }}); // navigate to the home page
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
            console.error(error);
            alert("Error creating post");
        }
    }

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
                        placeholder={"Title"}
                        classes={"post-form-input form-txt"}
                        value={post.title}
                        handleChange={handleChange}
                        name={"title"}/>
                    <textarea
                        name="content"
                        placeholder='Content...'
                        value={post.content}
                        onChange={handleChange}
                        className='text-area form-txt'
                    ></textarea>
                    <div className="row">
                        <TextInput 
                            placeholder={"Image URL (Optional)"}
                            classes={"post-form-input form-txt"}
                            value={post.image}
                            handleChange={handleChange}
                            name={"image"}/>
                    </div>
                    <Button 
                        submit={true}
                        content={"Create Post"}
                        handleClick={handleSubmit}
                        classes={"form-btn"}
                        />
                </form>
            </div>
        </div>
    );
};

export default CreatePost;