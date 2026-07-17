import { Inbox, Mail, Phone } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { MessageReadButton } from "./_components";

export const metadata = {
  title: "Contact Messages — Barangay Mulawin",
  description: "Review messages submitted through the public contact form.",
};

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: [{ isRead: "asc" }, { createdAt: "desc" }],
  });

  const unreadCount = messages.filter((message) => !message.isRead).length;

  return (
    <main className="px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
            Contact inbox
          </p>
          <h1 className="mt-2 text-4xl font-bold text-gray-800">
            Resident Messages
          </h1>
          <p className="mt-2 text-gray-500">
            Messages submitted through the Contact Us page appear here.
          </p>
        </div>

        {unreadCount > 0 && (
          <p className="mb-6 inline-flex rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-700">
            {unreadCount} unread {unreadCount === 1 ? "message" : "messages"}
          </p>
        )}

        {messages.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-12 text-center shadow-sm">
            <Inbox className="mx-auto h-12 w-12 text-gray-300" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              No messages yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-gray-500">
              Resident messages from the Contact Us form will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {messages.map((message) => (
              <article
                key={message.id}
                className={`rounded-3xl border bg-white p-6 shadow-sm ${
                  message.isRead ? "border-gray-100" : "border-pink-200"
                }`}
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      {!message.isRead && (
                        <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-pink-700">
                          New
                        </span>
                      )}
                      <span className="max-w-full break-words rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                        {message.subject}
                      </span>
                    </div>

                    <h2 className="mt-4 break-words text-xl font-bold text-gray-800">
                      {message.name}
                    </h2>
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
                      <a
                        href={`mailto:${message.email}`}
                        className="inline-flex min-w-0 items-center gap-2 break-all hover:text-pink-600"
                      >
                        <Mail className="h-4 w-4" />
                        {message.email}
                      </a>
                      {message.phone && (
                        <a
                          href={`tel:${message.phone}`}
                          className="inline-flex items-center gap-2 hover:text-pink-600"
                        >
                          <Phone className="h-4 w-4" />
                          {message.phone}
                        </a>
                      )}
                    </div>
                    <p className="mt-5 whitespace-pre-wrap break-words text-gray-700">
                      {message.message}
                    </p>
                  </div>

                  <div className="flex shrink-0 self-start flex-col gap-3">
                    <div className="rounded-2xl bg-gray-50 px-4 py-3 text-sm text-gray-500">
                      {message.createdAt.toLocaleDateString("en-PH", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <MessageReadButton
                      messageId={message.id}
                      isRead={message.isRead}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
