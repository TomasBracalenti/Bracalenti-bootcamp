const Login = ({
  handleChangePassword,
  handleChangeUsername,
  handleSumbitForm,
  username,
  password
}) => {


  
  return (
    <>
      <h1>login to application</h1>
      <form onSubmit={handleSumbitForm}>
        <div>
          <label>
            Username:
            <input 
            onChange={handleChangeUsername}
            value = {username}
            placeholder="myUsername"
            type="text" />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
            onChange={handleChangePassword}
            value={password}
            type="password" />
          </label>
          <button
          type="sumbit"
          >login</button>
        </div>
      </form>
    </>
  );
};

export default Login;
