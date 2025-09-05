import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const caseStudy = await prisma.caseStudy.findUnique({
      where: { slug: params.id },
    })

    if (!caseStudy) {
      return NextResponse.json({ error: "Case study not found" }, { status: 404 })
    }

    return NextResponse.json(caseStudy)
  } catch (error) {
    console.error("Error fetching case study:", error)
    return NextResponse.json({ error: "Failed to fetch case study" }, { status: 500 })
  }
}
