import React, { useState } from 'react'

const SignupForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || "Signup failed");
                return;
            }

            console.log("User created:", data);
            alert(`User created: ${data.email}`);

            setEmail("");
            setPassword("");

        } catch (err) {
            console.error("Network/server error:", err);
            alert("Could not reach server");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Enter email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="Enter password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">
                Sign up
            </button>

        </form>
    )
}

export default SignupForm