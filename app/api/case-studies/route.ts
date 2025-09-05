import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "6")
    const skip = (page - 1) * limit

    const where = category && category !== "All" ? { category } : {}

    const [caseStudies, total] = await Promise.all([
      prisma.caseStudy?.findMany({
        where,
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        skip,
        take: limit,
      }),
      prisma.caseStudy?.count({ where }),
    ])

    return NextResponse.json({
      caseStudies,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + limit < total,
      },
    })
  } catch (error) {
    console.error("Error fetching case studies:", error)
    return NextResponse.json({ error: "Failed to fetch case studies" }, { status: 500 })
  }
}
