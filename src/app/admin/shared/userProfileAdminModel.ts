export interface UserProfileAdminModel {
    id: string;
    userId: string;
    username: string;
    firstName: string;
    lastName: string;
    createdDate: string;
    authorities: [string];
}