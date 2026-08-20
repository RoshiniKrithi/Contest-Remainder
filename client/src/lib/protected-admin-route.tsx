import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route } from "wouter";

export function ProtectedAdminRoute({
    path,
    component: Component,
}: {
    path: string;
    component: React.ComponentType<any>;
}) {
    const { user, isLoading } = useAuth();

    return (
        <Route path={path}>
            {isLoading ? (
                <div className="flex items-center justify-center min-h-screen bg-slate-950">
                    <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
            ) : user && (user.role === "admin" || user.role === "staff") ? (
                <Component />
            ) : (
                <Redirect to="/" />
            )}
        </Route>
    );
}
