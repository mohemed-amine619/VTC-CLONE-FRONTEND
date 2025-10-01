import { DRIVER_ROLE } from "../Constants/Role";
import { getUserData } from "../helper/utils";

export function hideBookButton() {
    const userData = getUserData();
    const role = userData?.User?.role;
    return role == DRIVER_ROLE ? false : true
}