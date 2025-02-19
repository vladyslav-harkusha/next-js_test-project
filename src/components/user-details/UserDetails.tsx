import './UserDetails.scss';
import {getEntityById} from "@/services/api.get-data.service";
import {urlEndpoints} from "@/constants/urlEndpoints";
import {IUser} from "@/models/IUser";
import RecipesOfCurrentUser from "@/components/recipes-of-current-user/RecipesOfCurrentUser";
import Image from 'next/image';

type Props = { userId: string }

export default async function UserDetails({ userId }: Props) {
    const currentUser = await getEntityById<IUser>(urlEndpoints.authUsers, userId);

    if (!currentUser) return <h2 className='not-found-message'>User with id=<span>{userId}</span> is not found</h2>;
    const { id, firstName, lastName, gender, email, phone, birthDate, image } = currentUser;

    return (
        <div className='user-details'>
            <div className='info-wrapper'>
                <div className='image-wrapper'>
                    <Image src={image} width={300} height={300} alt={firstName} loading={"lazy"} />
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