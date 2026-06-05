"use client";

import { api } from "@/convex/_generated/api";
import usePresence from "@convex-dev/presence/react";
import FacePile from "@convex-dev/presence/facepile";
import { Id } from "@/convex/_generated/dataModel";

interface PostPresenceProps {
  roomId: Id<"posts">;
  userId?: string | null;
}

export default function PostPresence({ roomId, userId }: PostPresenceProps): React.ReactElement | null {
  if (!userId) {
    return null;
  }

  return <PostPresenceClient roomId={roomId} userId={userId} />;
}

function PostPresenceClient({ roomId, userId }: { roomId: Id<"posts">; userId: string; }): React.ReactElement | null {
  const presenceState = usePresence(api.presence, roomId, userId);

  if (!presenceState || presenceState.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2 rounded-3xl border border-border bg-muted/80 p-4 shadow-sm flex flex-items-center">
      <div className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground flex items-center gap-1 mt-2">
        viewing now 
      </div>
      <div className="ml-2 flex items-center gap-3 align-items-center">
        <FacePile presenceState={presenceState} />
        <div className="flex flex-col text-sm">
          <span className="font-semibold text-foreground items-center">
            {presenceState.length} {presenceState.length === 1 ? "reader" : "readers"}
          </span>
          <span className="text-xs text-muted-foreground">online now</span>
        </div>
      </div>
    </div>
  );
}