import React, { useEffect } from 'react';
import { requestUserPermission, NotificationListner } from '../helper/PushNotificationHelper'

const FcmPushNotificationScreen = (props) => {
    useEffect(() => {
        requestUserPermission()
        NotificationListner()
    }, [])
    return (
        <div>

        </div>
    );
}

export default FcmPushNotificationScreen;