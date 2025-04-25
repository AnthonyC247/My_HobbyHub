import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = ({ supabase }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    username: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Sign up user with Supabase Auth
    const { data, error: signupError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (signupError) {
      console.error('Signup error:', signupError.message);
      alert(signupError.message);
      setLoading(false);
      return;
    }

    // Get the current user (must be confirmed)
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('Get user error:', userError?.message || 'No user');
      alert('Failed to retrieve user after signup');
      setLoading(false);
      return;
    }

    // Insert user into custom users table
    const { error: dbError } = await supabase.from('users').insert({
      id: user.id,
      email: user.email,
      username: form.username,
    });

    if (dbError) {
      console.error('Insert into users table error:', dbError.message);
      alert('Failed to complete account setup.');
      setLoading(false);
      return;
    }

    // Redirect to home
    navigate('/home', {
      state: { user_id: user.id },
    });

    setLoading(false);
  };

  return (
    <div className="signup-page">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default Signup;


