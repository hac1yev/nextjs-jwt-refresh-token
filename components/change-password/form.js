"use client"

const Form = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="password" name="oldPassword" placeholder="Old Password" required />
            <input type="password" name="newPassword" placeholder="New Password" required />
            <button>Change Password</button>
        </form>
    );
};

export default Form;