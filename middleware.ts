import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import useStore from './src/store/store'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // const username = useStore((state)=>state.username);
    let response = NextResponse.next();
    console.log("USERNAME!", response);
    const cookies = response.cookies.getAll();
    console.log("COOKIES!", cookies);

  return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/game',
}