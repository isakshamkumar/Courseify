export const getCourse = async (courseId: string) => {
  const response = await fetch(`/api/courses/${courseId}`);
  return response.json();
};

/**export const getCourses = async ({
  userId,
  title,
  categoryId
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => { */