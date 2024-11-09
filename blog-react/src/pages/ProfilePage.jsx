import Header from "../components/header"
import Profile from "../components/Profile";
import UserPosts from "../components/posts/UserPost";
const ProfilePage = () =>{
    return(
        <div>
        <Header/>
        <Profile/>
        <UserPosts/>
        </div>
    )

}

export default ProfilePage;