import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function createAuditLog(
    action: string,
    entity?: string,
    entityId?: string
) {
    const session = await getServerSession(authOptions);

    if (!session?.user) return;

    await prisma.auditLog.create({
        data: {
            action,
            entity,
            entityId,
            userId: session.user.id,
            tenantId: session.user.tenantId,
        },
    });
}
