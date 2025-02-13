// import {FC} from "react";
// import './AuthUserHeaderInfo.scss';
// import {useAppSelector} from "../../redux/store.ts";
// import {useNavigate} from "react-router-dom";
// import {urlEndpoints} from "../../router/constans/urlEndpoints.ts";
//
// export const AuthUserHeaderInfo:FC = () => {
//     const { authUser } = useAppSelector(store => store.authStoreSlice);
//     const navigate = useNavigate();
//
//     return (
//         <div className='auth-user-info' onClick={() => navigate(`${urlEndpoints.allUsers}/${authUser?.id}`)}>
//             <div>
//                 <p className='username'>username: {authUser?.username}</p>
//                 <p className='user-email'>{authUser?.email}</p>
//             </div>
//             <div className='user-photo-wrapper'>
//                 <img src={authUser?.image} alt="user-photo"/>
//             </div>
//         </div>
//     );
// };