// import {MainButton} from "../UI/main-button/MainButton.tsx";
// import {FC, useCallback} from "react";
// import {authActions} from "../../redux/slices/authSlice.ts";
// import {useAppDispatch} from "../../redux/store.ts";
// import {IAuthResponseWithTokens} from "../../models/IAuthResponseWithTokens.ts";
// import './LogOut.scss';
//
// type Props = {
//     authUser: IAuthResponseWithTokens;
// }
//
// export const LogOut: FC<Props> = ({ authUser }) => {
//     const dispatch = useAppDispatch();
//
//     const handleLogOut = useCallback(() => {
//         dispatch(authActions.logOutUser());
//         localStorage.setItem('dummyAccessToken', '');
//         localStorage.setItem('dummyRefreshToken', '');
//     }, []);
//
//     return (
//         <div className='log-out'>
//             <h3 className='title-greeting'>
//                 Hello, <span>{authUser.firstName} {authUser.lastName}</span>, now you have access to Users and Recipes pages
//             </h3>
//
//             <div className='wrapper'>
//                 <p>You can log out from this App</p>
//                 <MainButton buttonText='Log out' buttonOnclick={handleLogOut}/>
//             </div>
//         </div>
//     );
// };