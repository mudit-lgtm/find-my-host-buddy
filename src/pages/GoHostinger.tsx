import { useEffect } from "react";

const HOSTINGER_URL = "https://www.hostinger.com/in?REFERRALCODE=YIIMADRASPUW";

const GoHostinger = () => {
  useEffect(() => {
    window.location.replace(HOSTINGER_URL);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center p-4 text-center">
      <div>
        <p className="text-muted-foreground mb-2">Redirecting to our hosting partner…</p>
        <a href={HOSTINGER_URL} className="text-primary underline">
          Click here if you are not redirected
        </a>
      </div>
    </div>
  );
};

export default GoHostinger;
