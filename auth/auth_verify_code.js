export const verifyCode = async (code) => {
    window.confirmationResult.confirm(code).then((result) => {
        console.log("ok")
        const user = result.user;
        return true;
    }).catch((error) => {
        console.log(error);
        return false;
    })
}
