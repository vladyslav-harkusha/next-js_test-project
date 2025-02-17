export interface ILoginData {
    username: FormDataEntryValue | null;
    password: FormDataEntryValue | null;
    expiresInMins?: number;
}
