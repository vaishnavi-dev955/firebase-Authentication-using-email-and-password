import './index.css'

const Home = props => {
  const onClickLogOutButton = () => {
    localStorage.removeItem('email')
    localStorage.removeItem('password')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="Home-container">
      <h1 className="heading">Hello World!</h1>
      <button
        type="button"
        onClick={onClickLogOutButton}
        className="LogOutButton"
      >
        Logout
      </button>
    </div>
  )
}

export default Home
