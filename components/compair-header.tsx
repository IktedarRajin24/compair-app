import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function CompairHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/LOGO.png"
            alt="Compair Logo"
            width={100}
            height={40}
            className="object-contain"
          />
        </Link>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            Login
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            Try for free
          </Button>
        </div>
      </div>
    </header>
  );
}
