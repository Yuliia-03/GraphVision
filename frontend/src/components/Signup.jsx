import { useState } from "react";
import { signup } from "../services/api";
import '../styles/Login.css'

export default function SignUp ({onClose, onSuccess }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
            e.preventDefault();
            setError(null);
            setLoading(true);
    
            try {
                await signup(email, password);
                onSuccess();
                //onClose();
            } catch (err) {
                setError(err.message || "Login failed");
            } finally {
                setLoading(false);
            }
        };

    return(
        <div className="popup">
            <div className="window">


                <form onSubmit={handleSubmit}>
                    <h3>Sign Up</h3>
                    <input type="text" placeholder="Email" name="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <input type="password"  placeholder="Password" name="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    
                    {error && <p className="error">{error}</p>}
                    <button type="submit" disabled={loading}>{loading ? "Signing up..." : "Sign up"}</button>
                </form>

                <button
                    type="button"
                    className="btn-close close-x"
                    aria-label="Close"
                    onClick={onClose}
                />

            </div>
        </div>
    );


};