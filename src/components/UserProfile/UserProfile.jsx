
function UserProfile() {

    return (
        <div>
            <h1>Welcome @username</h1>
            <form>
                <div>
                    <label>first name: </label>
                    <input></input>
                </div>
                <div>
                    <label>last name: </label>
                    <input></input>
                </div>
                <div>
                    <label>username: </label>
                    <input></input>
                </div>
                <div>
                    <label>email: </label>
                    <input></input>
                </div>
                <button type='submit'>Update</button>
            </form>
            <button type='submit'>Delete Account</button>
        </div>
    )
}

export default UserProfile
