'use client';
const token = sessionStorage.getItem('auth_token');
export default function dashboard(){
    return (
        <div>
            
            {token? <>
            dashboard
            </>:
             <>
            no dash login
            </>}
        </div>
    )
}