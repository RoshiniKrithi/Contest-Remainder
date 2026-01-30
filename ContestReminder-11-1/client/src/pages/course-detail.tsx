import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Users, 
  Clock, 
  Star, 
  GraduationCap, 
  DollarSign,
  CheckCircle,
  Play,
  ArrowLeft
} from "lucide-react";
import { Link } from "wouter";
import { EnrollmentStatus } from "@/components/courses/enrollment-status";
import { ProgressBar } from "@/components/courses/progress-bar";
import type { Course, Lesson, Enrollment } from "@shared/schema";

export default function CourseDetail() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  // For demo purposes, using a mock user ID until authentication is implemented
  const userId = "demo-user-123";

  // Fetch course data
  const { data: course, isLoading: courseLoading, error: courseError } = useQuery<Course>({
    queryKey: ["/api/courses", id],
  });

  // Fetch lessons for this course
  const { data: lessons = [], isLoading: lessonsLoading } = useQuery<Lesson[]>({
    queryKey: ["/api/courses", id, "lessons"],
    enabled: !!id,
  });

  // Fetch enrollment status
  const { data: enrollment } = useQuery<Enrollment>({
    queryKey: ["/api/users", userId, "courses", id, "enrollment"],
    retry: false,
    enabled: !!id,
  });

  // Enrollment mutation
  const enrollMutation = useMutation({
    mutationFn: async (courseId: string) => {
      return await apiRequest("POST", `/api/courses/${courseId}/enroll`, { userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users", userId, "courses", id, "enrollment"] });
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
    },
  });

  if (courseLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
            <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
                <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
              </div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
                <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (courseError || !course) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The course you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/courses">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/courses">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Button>
          </Link>
        </div>

        {/* Course header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 mb-8 text-white">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2" data-testid="course-title">
                {course.title}
              </h1>
              <p className="text-lg opacity-90 mb-4" data-testid="course-description">
                {course.description}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center">
                  <GraduationCap className="w-4 h-4 mr-1" />
                  {course.instructor}
                </div>
                <div className="flex items-center">
                  {renderStars(course.rating || 0)}
                  <span className="ml-1">({course.rating || 0}.0)</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {(course.students || 0).toLocaleString()} students
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {course.duration}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 ml-6">
              <Badge className={getLevelColor(course.level)}>
                {course.level}
              </Badge>
              <Badge className={getDifficultyColor(course.difficulty)}>
                {course.difficulty}
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 mr-1" />
              <span className={`text-xl font-bold ${
                course.price === "Free" ? "text-green-300" : "text-white"
              }`}>
                {course.price}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Info */}
            <Card>
              <CardHeader>
                <CardTitle>About This Course</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">What You'll Learn</h4>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(course.topics) && course.topics.map((topic: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                {course.prerequisites && (
                  <div>
                    <h4 className="font-semibold mb-2">Prerequisites</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {course.prerequisites}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Course Curriculum */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Course Curriculum
                </CardTitle>
              </CardHeader>
              <CardContent>
                {lessonsLoading ? (
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
                        <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : lessons.length > 0 ? (
                  <div className="space-y-3">
                    {lessons.map((lesson, index) => (
                      <div 
                        key={lesson.id} 
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        data-testid={`lesson-${index}`}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-semibold text-sm">
                            {lesson.order}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium">{lesson.title}</h5>
                            {lesson.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {lesson.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {(lesson.duration || 0) > 0 && (
                            <span className="text-sm text-gray-500 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {lesson.duration || 0}m
                            </span>
                          )}
                          <CheckCircle className="w-5 h-5 text-gray-300" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Course curriculum coming soon...
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Enrollment</CardTitle>
              </CardHeader>
              <CardContent>
                <EnrollmentStatus
                  enrollment={enrollment}
                  courseId={course.id}
                  onEnroll={(courseId) => enrollMutation.mutate(courseId)}
                  onContinue={(courseId) => {/* Navigate to lesson */}}
                  loading={enrollMutation.isPending}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Level</span>
                  <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Difficulty</span>
                  <Badge className={getDifficultyColor(course.difficulty)}>{course.difficulty}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Duration</span>
                  <span>{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Students</span>
                  <span>{(course.students || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Rating</span>
                  <div className="flex items-center">
                    {renderStars(course.rating || 0)}
                    <span className="ml-1">({course.rating || 0}.0)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}