import useAuthStore from "../../stores/use-auth.store";

const Profile = () => {
    const {userLooged} = useAuthStore();
    return(
        <>
            <h2>Perfil de usuario</h2>
            <p>¡Bienvenido! {userLooged?.displayName}</p>
        </>
    );
};

export default Profile;