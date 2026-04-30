import { useKaza } from "@/contexts/KazaContext";

type Feature = "payments" | "delete_members" | "analytics" | "settings";

export function useCanAccessFeature(feature: Feature): boolean {
  const { isSubAccount } = useKaza();

  const canAccess: Record<Feature, boolean> = {
    payments: !isSubAccount,
    delete_members: !isSubAccount,
    analytics: true,
    settings: true,
  };

  return canAccess[feature] ?? true;
}
