export function Footer() {
  return (
    <footer className="border-t bg-card py-8 mt-auto">
      <div className="container max-w-5xl mx-auto px-4 text-center text-sm text-muted-foreground">
        <p className="font-display font-semibold text-foreground mb-1">HostingChecker</p>
        <p>Find out who is hosting any website. Free hosting lookup tool.</p>
        <p className="mt-3">© {new Date().getFullYear()} HostingChecker. All rights reserved.</p>
      </div>
    </footer>
  );
}
