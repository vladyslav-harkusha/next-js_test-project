import './UsersList.scss';
import UserItem from "@/components/user-item/UserItem";
import {IUsersResponse} from "@/models/IUsersResponse";
import {getEntitiesByUrlParams} from "@/services/api.get-data.service";
import {urlEndpoints} from "@/constants/urlEndpoints";
import {SearchParams} from "next/dist/server/request/search-params";

type Props = { searchParams: Promise<SearchParams> }

export default async function UsersList({ searchParams }: Props) {
    const usersParams = await searchParams;

    const usersData= await getEntitiesByUrlParams<IUsersResponse>({
        endpoint: urlEndpoints.authUsers,
        search: usersParams.searchParams || '?',
        limit: Number(usersParams.limit) || 15,
        page: Number(usersParams.page) || 1
    });

    if (!usersData) return <h2>Load users error</h2>;
    const { users } = usersData;

    return (
        <div className='users-list'>
            <p className='users-list-description'>
                {users.length ? 'click on user item to see user details' : 'no users found'}
            </p>
            <ul>
                {users.map(user => (
                    <UserItem key={user.id} user={user} />
                ))}
            </ul>
        </div>
    );
};