import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    
    let path = "/blog";
    try {
      const body = await req.json().catch(() => null);
      if (body && typeof body.path === "string") path = body.path;
    } catch {
      // ignore parse errors and use default
    }

    // Call revalidatePath for the requested path.
    revalidatePath(path);

    return NextResponse.json({ ok: true, revalidated: path });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
