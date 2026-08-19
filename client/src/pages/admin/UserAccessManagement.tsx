import { useQuery, useMutation } from "@tanstack/react-query";
import AdminLayout from "@/components/layout/admin-layout";
import { User } from "@shared/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Shield, Ban, RotateCcw, AlertTriangle, XCircle, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { queryClient } from "@/lib/queryClient";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function UserAccessManagement() {
  const { user: currentUser } = useAuth();
  const { toast } = useToast();
  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "banned" | "revoked">("all");

  // Dialog & state values
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [banDialogOpen, setBanDialogOpen] = useState(false);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [revokeDialogOpen, setRevokeDialogOpen] = useState(false);
  const [reason, setReason] = useState("");

  // Mutations
  const banMutation = useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
      const res = await fetch(`/api/admin/users/${id}/ban`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to ban user");
      }
      return res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "User Banned Successfully",
        description: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      setBanDialogOpen(false);
      setSelectedUser(null);
      setReason("");
    },
    onError: (error: Error) => {
      toast({
        title: "Ban Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const restoreMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/users/${id}/restore`, {
        method: "PATCH",
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to restore user");
      }
      return res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "User Restored Successfully",
        description: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      setRestoreDialogOpen(false);
      setSelectedUser(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Restoration Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const revokeMutation = useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
      const res = await fetch(`/api/admin/users/${id}/revoke`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to revoke user account");
      }
      return res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "User Account Revoked",
        description: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      setRevokeDialogOpen(false);
      setSelectedUser(null);
      setReason("");
    },
    onError: (error: Error) => {
      toast({
        title: "Revocation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const getDynamicEmail = (user: User) => {
    return user.googleId
      ? `google_${user.googleId.slice(0, 6)}@gmail.com`
      : `${user.username}@codearena.local`;
  };

  const filteredUsers = users?.filter((u) => {
    const matchesSearch = u.username.toLowerCase().includes(search.toLowerCase()) || u.id.includes(search);
    const matchesStatus = statusFilter === "all" || u.accountStatus === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
              <Shield className="h-6 w-6 text-cyan-400" />
              User Access Management
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Temporarily restrict users, restore access, or revoke login permissions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search by username or ID..."
                className="pl-10 bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-0"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-slate-900 border border-slate-800 text-slate-100 px-3 py-2 rounded-md focus:border-cyan-500 outline-none text-sm cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="banned">Banned</option>
              <option value="revoked">Revoked</option>
            </select>
          </div>
        </div>

        <Card className="bg-slate-900 border-slate-800 text-slate-100">
          <CardHeader>
            <CardTitle className="text-lg text-slate-100">Platform Users</CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              Review authentication status and administer global restrictions. Admin accounts are protected.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-slate-500 py-12 text-center text-sm">Retrieving users list...</div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-slate-500 py-12 text-center text-sm">No users match your criteria.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-800 hover:bg-slate-900">
                    <TableHead className="text-slate-400">User ID</TableHead>
                    <TableHead className="text-slate-400">Username</TableHead>
                    <TableHead className="text-slate-400">Email Address</TableHead>
                    <TableHead className="text-slate-400">Role</TableHead>
                    <TableHead className="text-slate-400">Account Status</TableHead>
                    <TableHead className="text-slate-400 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((u) => {
                    const isAdmin = u.role === "admin" || u.role === "staff";
                    const isSelf = u.id === currentUser?.id;

                    return (
                      <TableRow key={u.id} className="border-slate-800 hover:bg-slate-800/40 transition-colors">
                        <TableCell className="font-mono text-xs text-slate-500">{u.id}</TableCell>
                        <TableCell className="font-medium text-slate-200">{u.username}</TableCell>
                        <TableCell className="text-slate-400 text-sm">{getDynamicEmail(u)}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase ${
                            isAdmin
                              ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}>
                            {u.role}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase ${
                            u.accountStatus === 'active'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : u.accountStatus === 'banned'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}>
                            {u.accountStatus || 'active'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {isAdmin || isSelf ? (
                            <span className="text-xs text-slate-600 italic flex items-center justify-end gap-1.5">
                              <Shield className="h-3.5 w-3.5" />
                              Protected Account
                            </span>
                          ) : u.accountStatus === "revoked" ? (
                            <span className="text-xs text-rose-500/80 font-medium flex items-center justify-end gap-1.5">
                              <XCircle className="h-3.5 w-3.5" />
                              Account Revoked
                            </span>
                          ) : (
                            <div className="flex justify-end gap-2">
                              {u.accountStatus === "banned" ? (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      setSelectedUser(u);
                                      setRestoreDialogOpen(true);
                                    }}
                                    className="hover:bg-emerald-500/10 hover:text-emerald-400 text-slate-400 border border-slate-800"
                                    disabled={restoreMutation.isPending}
                                  >
                                    <RotateCcw className="h-3.5 w-3.5 mr-1" />
                                    Restore
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      setSelectedUser(u);
                                      setRevokeDialogOpen(true);
                                    }}
                                    className="hover:bg-rose-500/10 hover:text-rose-400 text-slate-400 border border-slate-800"
                                    disabled={revokeMutation.isPending}
                                  >
                                    <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                                    Revoke
                                  </Button>
                                </>
                              ) : (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedUser(u);
                                    setBanDialogOpen(true);
                                  }}
                                  className="hover:bg-amber-500/10 hover:text-amber-400 text-slate-400 border border-slate-800"
                                  disabled={banMutation.isPending}
                                >
                                  <Ban className="h-3.5 w-3.5 mr-1" />
                                  Ban User
                                </Button>
                              )}
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* CONFIRMATION DIALOGS */}

      {/* Ban Dialog */}
      <Dialog open={banDialogOpen} onOpenChange={setBanDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-slate-100">
          <DialogHeader>
            <DialogTitle className="text-slate-100 flex items-center gap-2">
              <Ban className="h-5 w-5 text-amber-500" />
              Temporarily Ban User?
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-xs">
              This will temporarily prevent the user from accessing CodeArena. An email notification will be dispatched.
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="py-4 space-y-4">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 space-y-1">
                <p className="text-xs text-slate-500 font-medium">TARGET USER</p>
                <p className="text-sm font-semibold text-slate-200">{selectedUser.username}</p>
                <p className="text-xs text-slate-400">{getDynamicEmail(selectedUser)}</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Ban Reason (optional)</label>
                <Textarea
                  placeholder="Provide a reason for the restriction..."
                  className="bg-slate-950 border-slate-800 text-slate-100 focus:border-cyan-500 min-h-[80px]"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="ghost"
              className="text-slate-400 hover:bg-slate-800"
              onClick={() => {
                setBanDialogOpen(false);
                setSelectedUser(null);
                setReason("");
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-amber-600 hover:bg-amber-500 text-white"
              disabled={banMutation.isPending}
              onClick={() => {
                if (selectedUser) {
                  banMutation.mutate({ id: selectedUser.id, reason });
                }
              }}
            >
              {banMutation.isPending ? "Banning..." : "Confirm Ban"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Restore Dialog */}
      <Dialog open={restoreDialogOpen} onOpenChange={setRestoreDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-slate-100">
          <DialogHeader>
            <DialogTitle className="text-slate-100 flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-emerald-500" />
              Restore User Access?
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-xs">
              This will restore normal login capabilities and app access for the user.
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="py-4">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 space-y-1">
                <p className="text-xs text-slate-500 font-medium">TARGET USER</p>
                <p className="text-sm font-semibold text-slate-200">{selectedUser.username}</p>
                <p className="text-xs text-slate-400">{getDynamicEmail(selectedUser)}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="ghost"
              className="text-slate-400 hover:bg-slate-800"
              onClick={() => {
                setRestoreDialogOpen(false);
                setSelectedUser(null);
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-500 text-white"
              disabled={restoreMutation.isPending}
              onClick={() => {
                if (selectedUser) {
                  restoreMutation.mutate(selectedUser.id);
                }
              }}
            >
              {restoreMutation.isPending ? "Restoring..." : "Restore Access"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Revoke Dialog */}
      <Dialog open={revokeDialogOpen} onOpenChange={setRevokeDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-slate-100">
          <DialogHeader>
            <DialogTitle className="text-slate-100 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-rose-500" />
              Permanently Revoke Account?
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-xs">
              This is a permanent security action. The user's access will be permanently revoked. They will not be able to log in or access resources again.
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="py-4 space-y-4">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 space-y-1">
                <p className="text-xs text-slate-500 font-medium">TARGET USER</p>
                <p className="text-sm font-semibold text-slate-200">{selectedUser.username}</p>
                <p className="text-xs text-slate-400">{getDynamicEmail(selectedUser)}</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Revocation Reason (optional)</label>
                <Textarea
                  placeholder="Provide a reason for permanent revocation..."
                  className="bg-slate-950 border-slate-800 text-slate-100 focus:border-cyan-500 min-h-[80px]"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="ghost"
              className="text-slate-400 hover:bg-slate-800"
              onClick={() => {
                setRevokeDialogOpen(false);
                setSelectedUser(null);
                setReason("");
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-rose-600 hover:bg-rose-500 text-white"
              disabled={revokeMutation.isPending}
              onClick={() => {
                if (selectedUser) {
                  revokeMutation.mutate({ id: selectedUser.id, reason });
                }
              }}
            >
              {revokeMutation.isPending ? "Revoking..." : "Permanently Revoke"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
