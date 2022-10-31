export default function Register() {
    const handleFormSubmition = (e : any) => {
        e.preventDefault();

        console.log("form submiteds");
    }
    
    return (
        <main className="register">
            <form onSubmit={handleFormSubmition}>
                <input type="text" placeholder="Username" />
                <input type="text" placeholder="Password 1" />
                <input type="text" placeholder="Password 2" />
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />

                <button type="submit">Login</button>
            </form>
        </main>
    )
}