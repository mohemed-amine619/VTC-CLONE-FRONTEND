import { ADMIN_ROLE } from "../Constants/Role";
import { getUserData } from "../helper/utils";

export function isAdmin(to : any, from : any, next : any){
    const UserData = getUserData()?.User;
    if (UserData?.role === ADMIN_ROLE) {
        next();
    } else {
        return false;
    }
}
