import { useState } from "react";
import { signup } from "../services/api";
import "../styles/Login.css";

export default function SignUp({ onClose, onSuccess }) {
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
        } catch (err) {
            setError(err.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>

                <button className="close-btn" onClick={onClose}>
                    ×
                </button>

                <h3>Create account</h3>
                <p className="subtitle">Sign up to get started</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && <div className="error">{error}</div>}

                    <button type="submit" disabled={loading}>
                        {loading ? "Creating account..." : "Sign up"}
                    </button>
                </form>
            </div>
        </div>
    );
}