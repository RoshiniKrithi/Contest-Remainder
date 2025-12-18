import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, Star, BookOpen, GraduationCap, DollarSign } from "lucide-react";
import { Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { EnrollmentStatus } from "./enrollment-status";
import type { Enrollment } from "@shared/schema";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    level: string;
    duration: string;
    difficulty: string;
    topics: string[];
    prerequisites?: string | null;
    instructor: string;
    rating: number;
    students: number;
    price: string;
    thumbnail?: string | null;
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  const queryClient = useQueryClient();
  // For demo purposes, using a mock user ID until authentication is implemented
  const userId = "demo-user-123";
  
  // Fetch enrollment status for this course
  const { data: enrollment, isLoading: enrollmentLoading } = useQuery<Enrollment>({
    queryKey: ["/api/users", userId, "courses", course.id, "enrollment"],
    retry: false,
  });

  // Enrollment mutation
  const enrollMutation = useMutation({
    mutationFn: async (courseId: string) => {
      return await apiRequest("POST", `/api/courses/${courseId}/enroll`, { userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users", userId, "courses", course.id, "enrollment"] });
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
    },
  });
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "medium":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating 
                ? "text-yellow-400 fill-current" 
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-black border border-gray-600 rounded-lg p-4 hover:border-primary transition-colors card-hover theme-transition">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-white mb-1">
            {course.title}
          </h3>
          <p className="text-sm text-gray-300 line-clamp-2 mb-2">
            {course.description}
          </p>
        </div>
        <div className="flex flex-col items-end space-y-1 ml-3">
          <Badge className={getLevelColor(course.level)}>
            {course.level}
          </Badge>
          <Badge className={getDifficultyColor(course.difficulty)}>
            {course.difficulty}
          </Badge>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-300 mb-3">
        <span className="flex items-center">
          <Users className="h-4 w-4 mr-1" />
          {course.students.toLocaleString()} students
        </span>
        <span className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {course.duration}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-300 mb-3">
        <div className="flex items-center">
          <GraduationCap className="h-4 w-4 mr-1" />
          <span>{course.instructor}</span>
        </div>
        <div className="flex items-center space-x-1">
          {renderStars(course.rating)}
          <span className="ml-1">({course.rating}.0)</span>
        </div>
      </div>

      {course.topics && course.topics.length > 0 && (
        <div className="mb-3">
          <div className="flex items-center mb-1">
            <BookOpen className="h-4 w-4 mr-1 text-gray-300" />
            <span className="text-sm text-gray-300">Topics:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {course.topics.slice(0, 3).map((topic, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {topic}
              </Badge>
            ))}
            {course.topics.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{course.topics.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-1 text-gray-300" />
            <span className={`font-semibold ${
              course.price === "Free" 
                ? "text-green-400" 
                : "text-white"
            }`}>
              {course.price}
            </span>
          </div>
          <Link href={`/course/${course.id}`}>
            <Button variant="outline" size="sm" className="btn-animate">
              View Details
            </Button>
          </Link>
        </div>
        
        <EnrollmentStatus
          enrollment={enrollment}
          courseId={course.id}
          onEnroll={(courseId) => enrollMutation.mutate(courseId)}
          onContinue={(courseId) => window.location.href = `/course/${courseId}`}
          loading={enrollmentLoading || enrollMutation.isPending}
        />
      </div>
    </div>
  );
}