async function testLogin() {
    try {
        console.log("Attempting login...");
        const response = await fetch('http://localhost:5000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'admin@srms.com',
                password: 'admin'
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Login Success:", data);
        } else {
            console.log("Login Failed Status:", response.status);
            const text = await response.text();
            console.log("Response Body:", text);
        }
    } catch (error) {
        console.error("Fetch Error:", error.message);
    }
}

testLogin();
