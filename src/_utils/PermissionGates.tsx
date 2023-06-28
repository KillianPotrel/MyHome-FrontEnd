import React from 'react';
import { User, useUserInfo } from '../api/User';
import { Permission, useManyPermissionUserFamily } from '../api/Permission';

type PermissionGatesProps = {
    permission_key : string,
    inversed ?: boolean,
    children : any
}


const PermissionGates = ({permission_key, inversed = false, children} : PermissionGatesProps) : JSX.Element => {
    const { data : dataInfo } = useUserInfo()
    const user : User = dataInfo?.data

    const { data: dataPermissionUser } = useManyPermissionUserFamily(user?.id)
    const permissionUser : Permission[] = dataPermissionUser?.data

    //Case when you want to display the content of a user who does not have the right to do so
    if(inversed) {
        if (!permissionUser?.some(item => item.key === permission_key)) {
            return children}
    } else {
        if (permissionUser?.some(item => item.key === permission_key)) {
            return children;
        }
    }
};

export default PermissionGates;