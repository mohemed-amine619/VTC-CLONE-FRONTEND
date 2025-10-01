import { ADMIN_ROLE } from "../Constants/Role";

export function hideEditButton(role : any) {
    return role === ADMIN_ROLE ? false : true
}