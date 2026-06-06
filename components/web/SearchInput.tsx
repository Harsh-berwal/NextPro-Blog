import { Loader2, Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  const results = useQuery(
    api.post.searchPosts,
    searchTerm.length > 2 ? { term: searchTerm, limit: 5 } : "skip",
  );

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
    setOpen(true);
  }

  return (
    <div className="relative w-full max-w-sm z-10">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 text-muted-foreground size-4" />
        <Input
          type="search"
          placeholder="Search posts..."
          className="w-full pl-8 bg-background"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {open && searchTerm.length > 2 && (
        <div
          className="absolute top-full w-full rounded-md
                    border bg-popover p-2 mt-1 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95"
        >
          {results === undefined ? (
            <div className="flex items-center justify-center p-4 text-sm text-muted-foreground ">
              <Loader2 className="animate-spin size-4 mr-2" />
              searching...
            </div>
          ) : results.length === 0 ? (
            <div className="text-center p-4 text-sm text-muted-foreground ">
              No results found!
            </div>
          ) : (
            <div className="py-1">
              {results.map((result) => (
                <Link
                  className="flex flex-col px-4 py-2 text-sm rounded-md hover:bg-accent cursor-pointer hover:text-accent-foreground"
                  key={result._id}
                  href={`/blog/${result._id}`}
                  onClick={() => {
                    setOpen(false);
                    setSearchTerm("");
                  }}
                >
                  <p className="font-medium tracking">{result.title}</p>
                  <p className="text-xs text-muted-foreground pt-1">
                    {result.body.substring(0, 60)}...
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
