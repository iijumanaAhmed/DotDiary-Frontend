
function WeeklySummary({ user }) {
    return (
        <div>
            {
                user
                    ?
                    <>
                        <h1>Weekly Summary</h1>
                        {/* Display all focus sessions during the past 7 days */}
                    </>
                    :
                    <p>unathorized user</p>
            }
        </div>
    )
}

export default WeeklySummary
