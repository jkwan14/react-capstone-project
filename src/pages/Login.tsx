import { useState } from 'react';


function Login() {
    const[username, setUserName] = useState('');
    const[password, setPassword] = useState('');
    const[message, setMessage] = useState('');

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (!username || !password) {
            setMessage('Please enter a username and password.');
            return;
        }
        setMessage(`Logged in as ${username}`);
    }

    return (
        <section className='login-container'>
          <h2>Login Page</h2>
          {message && <p className='login-message'>{message}</p>}
          <form onSubmit={handleSubmit} className='login-form'>
            <label>
                Username:
                <input
                 value={username}
                 onChange={(event) => setUserName(event.target.value)}
                 />
            </label>

            <label>
                Password:
                <input
                 type='password'
                 value={password}
                 onChange={(event) => setPassword(event.target.value)}
                 />
            </label>

            <button type='submit'>Login</button>
          </form>
          </section>
    );
}

export default Login;