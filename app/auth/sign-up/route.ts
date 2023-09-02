import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const {
    body: { email, password, name, role },
  } = await request.json();
  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username: name, role },
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
    },
  });

  if (error) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 301,
      }
    );
  }

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  });
}
