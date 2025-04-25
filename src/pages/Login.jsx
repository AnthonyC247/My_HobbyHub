import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ supabase }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (loginError) {
      alert(loginError.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    // Check if user exists in `users` table
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (!existingUser || fetchError) {
      // User not in users table → insert them
      const { error: insertError } = await supabase.from('users').insert({
        id: user.id,
        email: user.email,
        username: user.email.split('@')[0], // fallback username
      });

      if (insertError) {
        alert("Could not insert user into database.");
        console.error(insertError);
        setLoading(false);
        return;
      }
    }

    // Navigate to home with user_id
    navigate('/home', {
      state: { user_id: user.id },
    });

    setLoading(false);
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
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
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;

