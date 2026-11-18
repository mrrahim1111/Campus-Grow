import { NextResponse } from "next/server";
import {
  ENGINEERING_DOMAINS,
  getAllHubCourses,
  getAllHubLessons,
  getHubStats,
  HubCourse,
  HubLesson,
} from "@/data/engineeringHub";

// In-memory runtime override store for dynamic CMS changes during session
let runtimeCustomCourses: HubCourse[] = [];
let runtimeCustomLessons: { courseId: string; moduleId: string; lesson: HubLesson }[] = [];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const domainId = searchParams.get("domainId");
    const query = searchParams.get("q")?.toLowerCase().trim();

    const stats = getHubStats();
    let courses = getAllHubCourses();

    if (domainId && domainId !== "ALL") {
      courses = courses.filter((c) => c.domainId === domainId);
    }

    if (query) {
      courses = courses.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query) ||
          c.technologies.some((t) => t.toLowerCase().includes(query))
      );
    }

    const allLessons = getAllHubLessons();

    // Flag resources needing review
    const auditReport = {
      lessonsMissingVideos: allLessons
        .filter((l) => !l.lesson.youtubeEmbedId && !l.lesson.youtubeUrl)
        .map((l) => ({
          lessonId: l.lesson.id,
          title: l.lesson.title,
          courseId: l.course.id,
          courseTitle: l.course.title,
          domainId: l.domain.id,
        })),
      lessonsMissingPdfNotes: allLessons
        .filter((l) => !l.lesson.pdfNotesUrl)
        .map((l) => ({
          lessonId: l.lesson.id,
          title: l.lesson.title,
          courseId: l.course.id,
          courseTitle: l.course.title,
          domainId: l.domain.id,
        })),
    };

    return NextResponse.json({
      success: true,
      stats: {
        ...stats,
        customCoursesCount: runtimeCustomCourses.length,
        customLessonsCount: runtimeCustomLessons.length,
      },
      domains: ENGINEERING_DOMAINS.map((d) => ({
        id: d.id,
        title: d.title,
        icon: d.icon,
        description: d.description,
        coursesCount: d.courses.length,
      })),
      courses,
      auditReport,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch curriculum data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, payload } = body;

    if (action === "update_lesson_resource") {
      const { lessonId, youtubeEmbedId, youtubeUrl, pdfNotesUrl, isPublished } = payload;
      if (!lessonId) {
        return NextResponse.json(
          { success: false, error: "lessonId is required" },
          { status: 400 }
        );
      }

      // Find lesson in static hub
      const all = getAllHubLessons();
      const target = all.find((item) => item.lesson.id === lessonId);
      if (target) {
        if (youtubeEmbedId !== undefined) target.lesson.youtubeEmbedId = youtubeEmbedId;
        if (youtubeUrl !== undefined) target.lesson.youtubeUrl = youtubeUrl;
        if (pdfNotesUrl !== undefined) target.lesson.pdfNotesUrl = pdfNotesUrl;
        if (isPublished !== undefined) target.lesson.isPublished = isPublished;

        return NextResponse.json({
          success: true,
          message: `Resource updated for lesson: ${lessonId}`,
          lesson: target.lesson,
        });
      }

      return NextResponse.json(
        { success: false, error: `Lesson ${lessonId} not found in catalog` },
        { status: 404 }
      );
    }

    if (action === "create_course") {
      const { course } = payload;
      if (!course || !course.id || !course.title || !course.domainId) {
        return NextResponse.json(
          { success: false, error: "Invalid course payload. id, title, and domainId are required." },
          { status: 400 }
        );
      }

      runtimeCustomCourses.push(course);

      // Append to the matching domain in memory
      const domain = ENGINEERING_DOMAINS.find((d) => d.id === course.domainId);
      if (domain) {
        domain.courses.push(course);
      }

      return NextResponse.json({
        success: true,
        message: `Course ${course.title} registered successfully`,
        course,
      });
    }

    return NextResponse.json(
      { success: false, error: `Unknown action: ${action}` },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Curriculum operation failed" },
      { status: 500 }
    );
  }
}
