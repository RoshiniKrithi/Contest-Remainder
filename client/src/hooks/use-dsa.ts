import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export interface DsaProblem {
  id: number;
  title: string;
  platform: string;
  problemUrl: string;
  difficulty: "Easy" | "Medium" | "Hard" | string;
  judge0ProblemId: number | null;
  orderIndex: number;
  status: "unsolved" | "attempted" | "solved";
  description?: string | null;
  sampleInput?: string | null;
  sampleOutput?: string | null;
  explanation?: string | null;
  testCases?: Array<{ input: string; output: string }> | null;
  starterCode?: Record<string, string> | null;
  savedCode?: string | null;
  savedLanguage?: string | null;
  timeSpent?: number;
  solvedAt?: string | null;
}

export interface DsaSubtopic {
  id: number;
  title: string;
  description: string | null;
  orderIndex: number;
  totalProblems: number;
  solvedProblems: number;
  progress: number;
  problems: DsaProblem[];
}

export interface DsaTopic {
  id: number;
  title: string;
  description: string | null;
  orderIndex: number;
  totalProblems: number;
  solvedProblems: number;
  progress: number;
  subtopics: DsaSubtopic[];
}

export interface DsaModulesResponse {
  overall: {
    totalProblems: number;
    solvedProblems: number;
    progress: number;
  };
  topics: DsaTopic[];
}

export interface AdminStudentProgress {
  userId: string;
  name: string;
  email: string;
  username: string;
  role: string;
  totalProblems: number;
  solvedProblems: number;
  attemptedProblems: number;
  completionPercentage: number;
  streak: number;
  lastActivity: string | null;
}

export interface AdminStudentProgressResponse {
  summary: {
    totalStudents: number;
    totalSolved: number;
    averageCompletion: number;
    activeStudents: number;
    totalProblems: number;
  };
  students: AdminStudentProgress[];
}

export interface CodeSubmissionRecord {
  problemId: number;
  problemTitle: string;
  topicTitle: string;
  difficulty: string;
  status: string;
  code: string;
  language: string;
  timeSpent: number;
  updatedAt: string;
  solvedAt: string | null;
}

export interface AdminStudentDetailResponse {
  student: {
    id: string;
    name: string;
    username: string;
    email: string;
    role: string;
  };
  overall: {
    total: number;
    solved: number;
    attempted: number;
    percentage: number;
    streak: number;
    totalTimeSpent: number;
    lastActivity: string | null;
  };
  topics: Array<{
    id: number;
    title: string;
    description: string | null;
    total: number;
    solved: number;
    percentage: number;
    subtopics: Array<{
      id: number;
      title: string;
      total: number;
      solved: number;
      percentage: number;
    }>;
  }>;
  submissions: CodeSubmissionRecord[];
}

export function useDsaModules() {
  return useQuery<DsaModulesResponse>({
    queryKey: ["/api/dsa/modules"],
  });
}

export function useUpdateDsaProblemStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ problemId, status, code, language }: { problemId: number; status: "unsolved" | "attempted" | "solved"; code?: string; language?: string }) => {
      const res = await apiRequest("POST", `/api/dsa/problems/${problemId}/status`, { status, code, language });
      return res.json();
    },
    onMutate: async ({ problemId, status, code, language }) => {
      await queryClient.cancelQueries({ queryKey: ["/api/dsa/modules"] });
      const previousData = queryClient.getQueryData<DsaModulesResponse>(["/api/dsa/modules"]);

      if (previousData) {
        let totalSolvedDelta = 0;

        const newTopics = previousData.topics.map(topic => {
          let topicSolvedDelta = 0;

          const newSubtopics = topic.subtopics.map(subtopic => {
            let subSolvedDelta = 0;

            const newProblems = subtopic.problems.map(prob => {
              if (prob.id === problemId) {
                const oldStatus = prob.status;
                if (oldStatus !== "solved" && status === "solved") {
                  subSolvedDelta += 1;
                } else if (oldStatus === "solved" && status !== "solved") {
                  subSolvedDelta -= 1;
                }
                return {
                  ...prob,
                  status,
                  savedCode: code !== undefined ? code : prob.savedCode,
                  savedLanguage: language !== undefined ? language : prob.savedLanguage,
                };
              }
              return prob;
            });

            topicSolvedDelta += subSolvedDelta;

            const newSubSolved = Math.max(0, subtopic.solvedProblems + subSolvedDelta);
            const newSubProgress = subtopic.totalProblems > 0 ? Number(((newSubSolved / subtopic.totalProblems) * 100).toFixed(1)) : 0;

            return {
              ...subtopic,
              solvedProblems: newSubSolved,
              progress: newSubProgress,
              problems: newProblems,
            };
          });

          totalSolvedDelta += topicSolvedDelta;

          const newTopicSolved = Math.max(0, topic.solvedProblems + topicSolvedDelta);
          const newTopicProgress = topic.totalProblems > 0 ? Number(((newTopicSolved / topic.totalProblems) * 100).toFixed(1)) : 0;

          return {
            ...topic,
            solvedProblems: newTopicSolved,
            progress: newTopicProgress,
            subtopics: newSubtopics,
          };
        });

        const newOverallSolved = Math.max(0, previousData.overall.solvedProblems + totalSolvedDelta);
        const newOverallProgress = previousData.overall.totalProblems > 0 ? Number(((newOverallSolved / previousData.overall.totalProblems) * 100).toFixed(1)) : 0;

        queryClient.setQueryData<DsaModulesResponse>(["/api/dsa/modules"], {
          ...previousData,
          overall: {
            ...previousData.overall,
            solvedProblems: newOverallSolved,
            progress: newOverallProgress,
          },
          topics: newTopics,
        });
      }

      return { previousData };
    },
    onError: (err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["/api/dsa/modules"], context.previousData);
      }
      toast({
        title: "Error updating progress",
        description: err.message || "Failed to update problem status. Progress restored.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dsa/modules"] });
    },
  });
}

export function useRunDsaIdeCode() {
  return useMutation({
    mutationFn: async ({ problemId, code, language, stdin }: { problemId: number; code: string; language: string; stdin?: string }) => {
      const res = await apiRequest("POST", `/api/dsa/problems/${problemId}/run`, { code, language, stdin });
      return res.json();
    },
  });
}

export function useSubmitDsaIdeCode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ problemId, code, language, stdin, expectedOutput, timeSpent }: { problemId: number; code: string; language: string; stdin?: string; expectedOutput?: string; timeSpent?: number }) => {
      const res = await apiRequest("POST", `/api/dsa/problems/${problemId}/submit`, { code, language, stdin, expectedOutput, timeSpent });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dsa/modules"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/students/progress"] });
    },
  });
}

export function useAdminStudentProgress() {
  return useQuery<AdminStudentProgressResponse>({
    queryKey: ["/api/admin/students/progress"],
  });
}

export function useAdminStudentDetailedProgress(userId: string) {
  return useQuery<AdminStudentDetailResponse>({
    queryKey: [`/api/admin/students/${userId}/progress`],
    enabled: !!userId,
  });
}
