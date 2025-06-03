export async function checkAdmin(){
    const sessionResponse = await fetch('/api/auth/me')
    if(sessionResponse.status===204){
        return false
    }
    const roleResponse = await fetch('/api/auth/fetchRole')
    const data = await roleResponse.json()
    console.log('a',data.role.id, process.env.NEXT_PUBLIC_ADMIN_ROLE)
    return data?.role?.id === process.env.NEXT_PUBLIC_ADMIN_ROLE
}