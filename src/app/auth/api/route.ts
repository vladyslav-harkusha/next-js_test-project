import {NextResponse} from "next/server";
import {setNewAuthCookies} from "@/server-actions/refreshTokens";

export async function POST(request: Request) {
    try {
        const { accessToken, refreshToken } = await request.json();

        await setNewAuthCookies(accessToken, refreshToken);

        return NextResponse.json({ message: 'New cookies were set' });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

