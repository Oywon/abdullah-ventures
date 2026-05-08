import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { getUserAccess } from "../lib/accessControl";
import { checkUserProfileExists } from "../lib/partnerPortalApi";

const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export const usePortalAccess = () => {
  const { user, isLoaded } = hasClerk ? useUser() : { user: null, isLoaded: true };
  const pathname = usePathname();
  const [access, setAccess] = useState(null);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [loading, setLoading] = useState(hasClerk);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadAccess = async () => {
      if (!hasClerk) {
        setAccess({
          role: "super_admin",
          companyId: "",
          companyName: "Abdullah Ventures",
          email: process.env.NEXT_PUBLIC_PARTNER_DEMO_EMAIL || "mdsalmantd5@gmail.com",
        });
        setProfileCompleted(true);
        setLoading(false);
        return;
      }

      if (!isLoaded) {
        return;
      }

      setLoading(true);
      setError("");

      try {
        const email = user?.primaryEmailAddress?.emailAddress || "";
        const [nextAccess, hasProfile] = await Promise.all([
          getUserAccess(email),
          checkUserProfileExists(email)
        ]);

        const configuredAdminEmail = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "").toLowerCase();
        const isConfiguredAdmin = Boolean(email) && email.toLowerCase() === configuredAdminEmail;

        if (mounted) {
          setProfileCompleted(hasProfile);
          if (nextAccess) {
            setAccess(nextAccess);
          } else {
            setAccess({
              role: isConfiguredAdmin ? "super_admin" : "user",
              companyId: "",
              companyName: isConfiguredAdmin ? "Abdullah Ventures" : "",
              email,
            });
          }
        }
      } catch (loadError) {
        if (mounted) {
          setError(loadError.message || "Unable to load access profile.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadAccess();

    return () => {
      mounted = false;
    };
  }, [isLoaded, user, pathname]);

  return { access, profileCompleted, loading, error };
};
