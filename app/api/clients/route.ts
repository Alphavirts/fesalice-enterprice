import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createAuditLog } from "@/lib/audit";
import { z } from "zod";

const clientSchema = z.z.object({
    name: z.string().min(2),
    phone: z.string().min(10),
    idNumber: z.string(),
    notes: z.string().optional(),
});

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const clients = await prisma.client.findMany({
        where: { tenantId: session.user.tenantId },
    });

    return NextResponse.json(clients);
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const json = await req.json();
        const body = clientSchema.parse(json);

        const client = await prisma.client.create({
            data: {
                ...body,
                tenantId: session.user.tenantId,
            },
        });

        await createAuditLog("CREATE_CLIENT", "Client", client.id);

        return NextResponse.json(client);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(JSON.stringify(error.issues), { status: 422 });
        }
        return new NextResponse(null, { status: 500 });
    }
}
