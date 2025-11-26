    import axiosInstance from "../utils/axiosInstance";

class CourseService {
  handleResponse(response) {
    return response.data;
  }

  handleError(error) {
    throw error;
  }

  async getAllCourses(params = {}) {
    try {
      const response = await axiosInstance.get("/course/all-courses", { params });
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getTopCourses(limit = 4) {
    try {
      // Prefer featured courses first, fallback to latest
      const params = {
        page: 1,
        limit,
        isFeatured: true,
        sortBy: "createdAt",
        order: "desc",
      };

      const resp = await this.getAllCourses(params);
      if (resp && resp.data && resp.data.length > 0) return resp.data;

      // fallback: fetch latest courses
      const fallback = await this.getAllCourses({ page: 1, limit, sortBy: "createdAt", order: "desc" });
      return fallback?.data || [];
    } catch (error) {
      this.handleError(error);
    }
  }

  async getCourseById(courseId) {
    try {
      const response = await axiosInstance.get(`/course/${courseId}`);
      // Controller returns { data: course }
      return response?.data?.data || null;
    } catch (error) {
      this.handleError(error);
    }
  }

  async submitCourseForm(payload) {
    try {
      const response = await axiosInstance.post("/courseForm/create-form", payload);
      return response?.data || null;
    } catch (error) {
      this.handleError(error);
    }
  }
}

const courseService = new CourseService();
export default courseService;
