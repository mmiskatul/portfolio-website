import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const getFilePath = () => {
  return path.join(process.cwd(), "src", "data", "projects.json");
};

// Auth helper
const isAuthenticated = (req: NextRequest) => {
  const sessionToken = req.cookies.get("session_token")?.value;
  return sessionToken === "miskatul-masabi-session-2026";
};

// GET: Return all projects
export async function GET() {
  try {
    const filePath = getFilePath();
    if (!fs.existsSync(filePath)) {
      return NextResponse.json([]);
    }
    const fileContent = fs.readFileSync(filePath, "utf8");
    const projects = JSON.parse(fileContent);
    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET Projects error:", error);
    return NextResponse.json({ error: "Failed to read projects database" }, { status: 500 });
  }
}

// POST: Add new project
export async function POST(req: NextRequest) {
  try {
    if (!isAuthenticated(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const filePath = getFilePath();
    const fileContent = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "[]";
    const projects = JSON.parse(fileContent);

    const body = await req.json();
    const { title, category, description, problemSolved, architecture, techStack, gitLink, liveLink, features, challenges, solutions, results, lessonsLearned } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }

    const newProject = {
      id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      title,
      category: category || "Generative AI",
      description,
      problemSolved: problemSolved || "",
      architecture: architecture || "",
      techStack: Array.isArray(techStack) ? techStack : typeof techStack === "string" ? techStack.split(",").map((t: string) => t.trim()) : [],
      gitLink: gitLink || "",
      liveLink: liveLink || "",
      features: Array.isArray(features) ? features : typeof features === "string" ? (features as string).split("\n").filter(Boolean) : [],
      challenges: challenges || "",
      solutions: solutions || "",
      results: results || "",
      lessonsLearned: lessonsLearned || ""
    };

    projects.push(newProject);
    fs.writeFileSync(filePath, JSON.stringify(projects, null, 2), "utf8");

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("POST Project error:", error);
    return NextResponse.json({ error: "Failed to save project" }, { status: 500 });
  }
}

// PUT: Edit existing project
export async function PUT(req: NextRequest) {
  try {
    if (!isAuthenticated(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const filePath = getFilePath();
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Database not found" }, { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const projects = JSON.parse(fileContent);

    const body = await req.json();
    const { id, title, category, description, problemSolved, architecture, techStack, gitLink, liveLink, features, challenges, solutions, results, lessonsLearned } = body;

    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const projectIndex = projects.findIndex((p: any) => p.id === id);
    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    projects[projectIndex] = {
      ...projects[projectIndex],
      title: title || projects[projectIndex].title,
      category: category || projects[projectIndex].category,
      description: description || projects[projectIndex].description,
      problemSolved: problemSolved || projects[projectIndex].problemSolved,
      architecture: architecture || projects[projectIndex].architecture,
      techStack: Array.isArray(techStack) ? techStack : typeof techStack === "string" ? techStack.split(",").map((t: string) => t.trim()) : projects[projectIndex].techStack,
      gitLink: gitLink || projects[projectIndex].gitLink,
      liveLink: liveLink || projects[projectIndex].liveLink,
      features: Array.isArray(features) ? features : typeof features === "string" ? (features as string).split("\n").filter(Boolean) : projects[projectIndex].features,
      challenges: challenges || projects[projectIndex].challenges,
      solutions: solutions || projects[projectIndex].solutions,
      results: results !== undefined ? results : projects[projectIndex].results,
      lessonsLearned: lessonsLearned !== undefined ? lessonsLearned : projects[projectIndex].lessonsLearned
    };

    fs.writeFileSync(filePath, JSON.stringify(projects, null, 2), "utf8");
    return NextResponse.json(projects[projectIndex]);
  } catch (error) {
    console.error("PUT Project error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

// DELETE: Remove project
export async function DELETE(req: NextRequest) {
  try {
    if (!isAuthenticated(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const filePath = getFilePath();
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Database not found" }, { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const projects = JSON.parse(fileContent);

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const filteredProjects = projects.filter((p: any) => p.id !== id);
    if (filteredProjects.length === projects.length) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    fs.writeFileSync(filePath, JSON.stringify(filteredProjects, null, 2), "utf8");
    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.error("DELETE Project error:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
