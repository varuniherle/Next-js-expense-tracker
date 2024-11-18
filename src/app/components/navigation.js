import Link from 'next/link'
export function Navigation(){
    return(
        <div>
            <ul>
                <li>
                <Link href="/">Home</Link>
                </li>
                <li>
                <Link href="/pages/dashboard">dashboard</Link>
                </li>
                <li>
                <Link href="/pages/login">Login</Link>
                </li>
                <li>
                <Link href="/pages/signup">Sign-UP</Link>
                </li>
            </ul>
        </div>
    )
}