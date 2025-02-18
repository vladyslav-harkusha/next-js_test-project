import './UserDetails.scss';
import { getEntityById} from "@/services/api.get-data.service";
import {urlEndpoints} from "@/constants/urlEndpoints";
import {IUser} from "@/models/IUser";

import RecipesOfCurrentUser from "@/components/recipes-of-current-user/RecipesOfCurrentUser";

type Props = {
    userId: string;
}

export default async function UserDetails({ userId }: Props) {
    const currentUser: IUser = await getEntityById(urlEndpoints.authUsers, userId);

    if (!currentUser) return <h2>user with id = {userId} is not found</h2>;
    const { id, firstName, lastName, gender, email, phone, birthDate, image } = currentUser;

    return (
        <div className='user-details'>
            <div className='info-wrapper'>
                <div className='image-wrapper'>
                    <img src={image} alt={firstName} className='user-image'/>
                </div>
                <div className='user-info'>
                    <h3 className='user-name'>user №{id}: {firstName} {lastName}</h3>
                    <p><span>Gender:</span> {gender}</p>
                    <p><span>Birth date:</span> {birthDate}</p>
                    <p><span>email:</span> {email}</p>
                    <p><span>phone:</span> {phone}</p>
                </div>
            </div>

            <RecipesOfCurrentUser userId={userId} />
        </div>
    );
};