export const addSocialAction = (data) => {
    return {
        type: 'socialListAdded/addSocial',
        payload: data
    }
}  

export const removeSocialAction = (data) => {
    return {
        type: 'socialListAdded/removeSocial',
        payload: data
    }
}

export const syncEmailInfoData = (data) => {
    return {
        type: 'emailInfo/syncData',
        payload: data

    }
}

export const addSocialLinksToTemplate = (data) => {
    return {
        type: 'template/ADD_SOCIAL_TO_TEMPLATE',
        payload: data
    }
}